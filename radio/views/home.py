import aiohttp_jinja2
from aiohttp import web


class HomeView(web.View):
    """
    Base view that return index page with all JS fancy stuff on it
    """

    @aiohttp_jinja2.template('radio/landing.html')
    async def get(self):
        return {}