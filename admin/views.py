from bson.json_util import dumps
from aiohttp import web
import aiohttp_jinja2
from radio.models import Quote


class Admin:

    def __init__(self):
        pass

    async def register_model(self):
        # TODO: implement kind a 'register of models'. Check Flask and Django Examples. Maybe postponed
        # to check django.contrib.admin.sites.AdminSite
        pass


class AdminListView(web.View):

    @aiohttp_jinja2.template('admin/list.html')
    async def get(self):
        return {}


class QuoteAdminListView(web.View):

    @aiohttp_jinja2.template('admin/quote/quote_list.html')
    async def get(self):
        quote = Quote(db=self.request.db, data={})
        all_quotes = await quote.all()
        return {'quotes': all_quotes}


class QuoteAdminNewView(web.View):

    @aiohttp_jinja2.template('admin/quote/quote_new.html')
    async def get(self):
        return {}

    async def post(self):
        data = await self.request.post()
        user = Quote(self.request.db, data)
        result = await user.create_quote()
        return web.HTTPFound('/admin/quote')


class Collection(web.View):

    def encode(self, data):
        return dumps(data, indent=4).encode('utf-8')

    async def get(self):
        quote = Quote(db=self.request.db, data={})
        all_quotes = await quote.all()
        return web.Response(status=200,
                            body=self.encode(
                                data={'quotes': all_quotes}),
                            content_type='application/json')

    async def post(self):
        data = await self.request.post()
        quote = Quote(self.request.db, data)
        result = await quote.create_quote()
        all_quotes = await quote.all()
        return web.Response(status=200,
                            body=self.encode(
                                data={'quotes': all_quotes}),
                            content_type='application/json')
