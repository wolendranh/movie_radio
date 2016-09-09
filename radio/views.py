import logging

from concurrent.futures import CancelledError

import aiohttp_jinja2
from aiohttp.errors import ClientOSError
from aiohttp import web
from aioredis import create_redis
from etc.ice_fetcher import get_current_song
from config.settings import STREAM_HOST, STREAM_PORT

server_logger = logging.getLogger('aiohttp.server')


class HomeView(web.View):

    @aiohttp_jinja2.template('radio/landing.html')
    async def get(self):
        return {}


async def push_current_track(request):
    if request.headers['Accept'] != 'text/event-stream':
        raise web.HTTPFound('/')

    response = web.StreamResponse(status=200, headers={
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    })
    redis = await create_redis(('localhost', 6379))
    channel = (await redis.subscribe('CHANNEL'))[0]
    response.start(request)
    try:
        current_song = await get_current_song(host=STREAM_HOST, port=STREAM_PORT)
        response.write(b'event: track_update\r\n')
        response.write(b'data: ' + str.encode(current_song) + b'\r\n\r\n')
        await response.drain()
    except (ClientOSError, CancelledError) as e:
        server_logger.warning('Error occurred while reading from Redis, current song {}!'.format(str(e)))
        while True:
            while await channel.wait_message():
                try:
                    message = await channel.get()
                    response.write(b'event: track_update\r\n')
                    response.write(b'data: ' + message + b'\r\n\r\n')
                except CancelledError as e:
                    server_logger.warning('Error occurred while reading from Redis, next song {}!'.format(str(e)))
            await response.drain()
    return response

