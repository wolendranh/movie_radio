import json
from time import time
import aiohttp_jinja2
from aiohttp_session import get_session
from aiohttp import web
from auth.services import check_user_auth


def redirect(request, router_name):
    url = request.app.router[router_name].url()
    raise web.HTTPFound(url)


def set_session(session, user_id, request):
    session['user'] = str(user_id)
    session['last_visit'] = time()
    return session


def convert_json(message):
    return json.dumps(message)


class Login(web.View):

    @aiohttp_jinja2.template('auth/login.html')
    async def get(self):
        session = await get_session(self.request)
        if session.get('user'):
            redirect(self.request, 'home')
        return {'conten': 'Please enter login or email'}

    async def post(self):
        data = await self.request.post()

        user = await check_user_auth(db=self.request.db, email=data.get('username'), password=data.get('password'))

        if isinstance(user, dict):
            session = await get_session(self.request)
            session = set_session(session, str(user['_id']), self.request)
            return web.json_response(content_type='application/json', data=convert_json({'login': 'true'}), status=200,)
            # redirect(self.request, self.request.GET['?prev_url'])
        else:
            return web.json_response(content_type='application/json', text=convert_json({'login': 'false'}), status=401)


class SignOut(web.View):

    async def get(self, **kw):
        session = await get_session(self.request)
        if session.get('user'):
            del session['user']
            redirect(self.request, 'login')
        else:
            raise web.HTTPForbidden(body=b'Forbidden')
