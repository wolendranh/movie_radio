from aiohttp import web
import aiohttp_jinja2


class AdminView(web.View):

    @aiohttp_jinja2.template('')
    async def get(self):
        return {}

