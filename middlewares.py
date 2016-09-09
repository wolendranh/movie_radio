from aiohttp import web
from aiohttp_session import get_session
from config.settings import *


async def db_handler(app, handler):
    async def middleware(request):
        if request.path.startswith('/static/') or request.path.startswith('/_debugtoolbar'):
            response = await handler(request)
            return response

        response = await handler(request)
        if not isinstance(response, web.Response):
            # most likely we got here an Stream or WebSocket
            return response

        request.db = app.db
        response = await handler(request)
        return response
    return middleware


async def authorize(app, handler):
    async def middleware(request):
        def check_path(path):
            result = True
            for r in ['/login', '/login-api' '/img', '/static/', '/signout', '/_debugtoolbar/', '/api']:
                if path.startswith(r) or path == '/':
                    result = False
            return result

        session = await get_session(request)
        if session.get("user"):
            return await handler(request)
        elif check_path(request.path):
            url = request.app.router['login'].url()
            raise web.HTTPFound(url)
        else:
            return await handler(request)

    return middleware
