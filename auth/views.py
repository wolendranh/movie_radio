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
    print(session)
    redirect(request, 'home')


def convert_json(message):
    return json.dumps({'error': message})


class Login(web.View):

    @aiohttp_jinja2.template('auth/login.html')
    async def get(self):
        session = await get_session(self.request)
        if session.get('user'):
            redirect(self.request, 'home')
        return {'conten': 'Please enter login or email'}

    async def post(self):
        data = await self.request.post()

        user = await check_user_auth(db=self.request.db, email=data.get('email'), password=data.get('password'))

        if isinstance(user, dict):
            session = await get_session(self.request)
            set_session(session, str(user['_id']), self.request)
        else:
            result = {'error': 'user does not exists'}
            return web.Response(content_type='application/json', text=convert_json(result))


class SignOut(web.View):

    async def get(self, **kw):
        session = await get_session(self.request)
        if session.get('user'):
            del session['user']
            redirect(self.request, 'login')
        else:
            raise web.HTTPForbidden(body=b'Forbidden')
