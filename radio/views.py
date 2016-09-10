import logging
import re

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

    stream = web.StreamResponse()
    stream.headers['Content-Type'] = 'text/event-stream'
    stream.headers['Cache-Control'] = 'no-cache'
    stream.headers['Connection'] = 'keep-alive'

    await stream.prepare(request)

    redis = await create_redis(('localhost', 6379))
    channel = (await redis.subscribe('CHANNEL'))[0]
    try:
        current_song = await get_current_song(host=STREAM_HOST, port=STREAM_PORT)
        stream.write(b'event: track_update\r\n')
        stream.write(b'data: ' + str.encode(current_song) + b'\r\n\r\n')
        await stream.drain()
        while (await channel.wait_message()):
                message = await channel.get()
                print ("new message {}".format(message))
                stream.write(b'event: track_update\r\n')
                stream.write(b'data: ' + message + b'\r\n\r\n')
                print("wrote message {}".format(message))
                await stream.drain()
    except (ClientOSError, CancelledError) as e:
        raise e
        # server_logger.warning('Error occurred while reading from Redis, next song {}!'.format(str(e)))

    await stream.write_eof()
    return stream

