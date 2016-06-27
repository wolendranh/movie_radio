from aiohttp import web
import aiohttp_jinja2


class AdminView(web.View):

    @aiohttp_jinja2.template('admin/base_admin.html')
    async def get(self):
        return {}

    async def register_model(self):
        # TODO: implement kind a 'register of models'. Check Flask and Django Examples. Maybe postponed
        # to check django.contrib.admin.sites.AdminSite
        pass
