
import json
import asyncio
import aiohttp
from aioredis import create_redis
import sys
import json
import time

METADATA_FILE = 'status-json.xsl'


def main(*args):
    host, port = args
    print(host, port)
    loop = asyncio.get_event_loop()
    while  True:
        title = loop.run_until_complete(get_current_song(host, port))
        if title:
            redis = loop.run_until_complete(create_redis(('localhost', 6379)))
            loop.run_until_complete(redis.publish('CHANNEL', json.dumps({'title': title})))
    loop.close()
    return False




async def get_current_song(host, port):
    if port:
        host = ':'.join([host, port])
    host = '/'.join([host, METADATA_FILE])
    response = await aiohttp.request('GET', host)
    body = await response.json()
    title = body['icestats']['source'].get('title')
    await asyncio.sleep(2)
    return title


if __name__ == '__main__':
    try:
        main(*sys.argv[1:])
    except KeyboardInterrupt:
        print('Finished')    