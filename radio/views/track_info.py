import logging

from aiohttp import web

from etc.ice_fetcher import get_current_song

server_logger = logging.getLogger('aiohttp.server')


class IcecastTrackView(web.View):

    async def get(self):
        current_track = await get_current_song(icecast_host=self.request.app.settings.STREAM_HOST,
                                               icecast_port=self.request.app.settings.STREAM_PORT)

        return web.json_response({'track': current_track})
