import logging

from aiohttp import web

from etc.ice_fetcher import get_current_song
from radio.services.date import get_day_time

server_logger = logging.getLogger('aiohttp.server')


class IcecastTrackView(web.View):

    async def get(self):
        current_track = await get_current_song(icecast_host=self.request.app.settings.STREAM_HOST,
                                               icecast_port=self.request.app.settings.STREAM_PORT)

        # workaround so far to apply filter
        # FIXME: add separate endpoint for this. Possible - query every 10, 15 mins?

        datetime = get_day_time()
        return web.json_response({'track': current_track, 'datetime': datetime})
