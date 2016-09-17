import logging
from concurrent.futures import CancelledError

import asyncio
from aiohttp import web
from aioredis import create_redis


from etc.ice_fetcher import get_current_song
from config.settings import STREAM_HOST, STREAM_PORT

server_logger = logging.getLogger('aiohttp.server')


async def push_current_track(request):
    """
    Args:
        request: HTTP request (aiohttp.web_reqrep.Request)

    View that handle SSE updates of current track obtained from Icecast server
    using keep-alive text/event-stream Response
    """
    if request.headers['Accept'] != 'text/event-stream':
        raise web.HTTPFound('/')

    # Construct Stream Response for SSE
    stream = web.StreamResponse()
    stream.headers['Content-Type'] = 'text/event-stream'
    stream.headers['Cache-Control'] = 'no-cache'
    stream.headers['Connection'] = 'keep-alive'

    await stream.prepare(request)

    redis = await create_redis(('localhost', 6379))
    channel, _ = await redis.subscribe('CHANNEL', '')
    try:
        current_song = await get_current_song(icecast_host=STREAM_HOST,
                                              icecast_port=STREAM_PORT)
        if current_song:
            stream.write(b'event: track_update\r\n')
            stream.write(b'data: ' + str.encode(current_song) + b'\r\n\r\n')
        else:
            # pass because no song available, will wait for next one from Redis
            pass

    except Exception as e:
        server_logger.error('got error while getting current song {}'.format(e))

    # going into loop to get updates fro redis
    try:
        try:
            while True:
                # check the channel queue size
                if channel._queue.qsize() > 0:
                    for msg in range(channel._queue.qsize()):
                        message = await channel.get()
                        if message:
                            # it is possible that there will be no song playing
                            # so we check it. In other case Client will kill server with
                            # every 3 second request for new song.
                            stream.write(b'event: track_update\r\n')
                            stream.write(b'data: ' + message + b'\r\n\r\n')
                else:
                    stream.write(b'event: ping\r\n')
                    stream.write(b'data: ' + b'waiting...' + b'\r\n\r\n')
                    await asyncio.sleep(10, loop=request.app.loop)
        except Exception as e:
            import traceback
            server_logger.error('Connection with redis broken? {}'.format(e))
            traceback.print_exc()

    except CancelledError as e:
        server_logger.error('Feature got canceled {}'.format(e))
    # here we mark that response processing is finished
    # After write_eof() call any manipulations with the response object are forbidden.
    print ('will call eof')
    await stream.write_eof()

    return stream
