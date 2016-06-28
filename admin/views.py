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




