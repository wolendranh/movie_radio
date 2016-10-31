import logging

from aiohttp import web

from etc.ice_fetcher import get_current_song

from radio.services.date import get_day_time
from radio.services.decoders import decode_track
from radio.services.exceptions import DecodeServiceError

server_logger = logging.getLogger('aiohttp.server')


class IcecastTrackView(web.View):

    async def get(self):
        current_track = await get_current_song(icecast_host=self.request.app.settings.STREAM_HOST,
                                               icecast_port=self.request.app.settings.STREAM_PORT)

        # workaround so far to apply filter
        # FIXME: add separate endpoint for this. Possible - query every 10, 15 mins?
        try:
            current_track = decode_track(track=current_track)
        except DecodeServiceError as e:
            server_logger.exception("decoding error with original track {} (not encoded). Exception message {}". format(
                current_track, e
            ))

        datetime = get_day_time()
        return web.json_response({'track': current_track, 'datetime': datetime})
