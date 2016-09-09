import json

import aiohttp_jinja2
from aiohttp import web
from aioredis import create_redis
from etc.ice_fetcher import get_current_song
from config.settings import STREAM_HOST, STREAM_PORT


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
    response.prepare(request)
    redis = await create_redis(('localhost', 6379))
    channel = (await redis.subscribe('CHANNEL'))[0]

    current_song = await get_current_song(host=STREAM_HOST, port=STREAM_PORT)
    if current_song:
        response.prepare(request)
        response.write(b'event: track_update\r\n')
        response.write(b'data: ' + str.encode(current_song) + b'\r\n\r\n')
        return response

    while await channel.wait_message():
        message = await channel.get()
        response.prepare(request)
        response.write(b'event: track_update\r\n')
        response.write(b'data: ' + message + b'\r\n\r\n')

    return response
