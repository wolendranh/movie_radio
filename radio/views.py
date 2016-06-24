import aiohttp_jinja2
from aiohttp import web

class HomeView(web.View):
    @aiohttp_jinja2.template('base.html')
    async def get(self):
        return {}