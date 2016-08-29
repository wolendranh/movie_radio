import asyncio
import aiohttp_jinja2
from aiohttp import web
from aiohttp_session import session_middleware
from aiohttp_session.cookie_storage import EncryptedCookieStorage
import aiohttp_debugtoolbar
import jinja2
from motor import motor_asyncio as ma

from routes import routes, API_ROUTES
from settings import *
from middlewares import authorize, db_handler

async def init(loop):

    # maybe later add authorize middleware
    app = web.Application(loop=loop,middlewares=[
        session_middleware(EncryptedCookieStorage(SECRET_KEY)),
        db_handler,
        ])
    aiohttp_debugtoolbar.setup(app)
    handler = app.make_handler()
    aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('templates'))

    # route part
    app.router.add_static('/static', 'static', name='static')
    for api_route in API_ROUTES:
        app.router.add_route(api_route[0], api_route[1], api_route[2], name=api_route[3])
    for route in routes:
        app.router.add_route(route[0], route[1], route[2], name=route[3])
    # end route part
    # db connect
    app.client = ma.AsyncIOMotorClient(MONGO_HOST)
    app.db = app.client[MONGO_DB_NAME]
    # end db connect
    serv_generator = loop.create_server(handler, SITE_HOST, SITE_PORT)
    return serv_generator, handler, app

loop = asyncio.get_event_loop()
serv_generator, handler, app = loop.run_until_complete(init(loop))
serv = loop.run_until_complete(serv_generator)
print('start server %s' % str(serv.sockets[0].getsockname()))
try:
    loop.run_forever()
except KeyboardInterrupt:
    print('Stop server begin')
finally:
    loop.run_until_complete(shutdown(serv, app, handler))
    loop.close()
print('Stop server end')
