import aiohttp_jinja2
from aiohttp import web
from aioredis import create_redis


class HomeView(web.View):
    @aiohttp_jinja2.template('base.html')
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
    response.start(request)
    redis = await create_redis(('localhost', 6379))
    channel = (await redis.subscribe('CHANNEL'))[0]

    while await channel.wait_message():
        message = await channel.get()
        response.write(b'event: track_update\r\n')
        response.write(b'data: ' + message + b'\r\n\r\n')

    return response
