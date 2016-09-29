import aiohttp_jinja2
from aiohttp import web
from radio.services.date import get_day_time


class HomeView(web.View):
    """
    Base view that return index page with all JS fancy stuff on it
    """

    @aiohttp_jinja2.template('radio/landing.html')
    async def get(self):
        return {'filter_class': get_day_time()}
