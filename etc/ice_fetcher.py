
import json
import asyncio
import aiohttp
from aioredis import create_redis
import sys
import json

METADATA_FILE = 'status-json.xsl'


def main(*args):
    host, port = args
    print(host, port)
    loop = asyncio.get_event_loop()

    response = loop.run_until_complete(get_current_song(host, port))

    redis = loop.run_until_complete(create_redis(('localhost', 6379)))
    loop.run_until_complete(redis.publish('CHANNEL', json.dumps(response)))
    loop.close()
    print (response)
    return False




async def get_current_song(host, port):
    if port:
        host = ':'.join([host, port])
    host = '/'.join([host, METADATA_FILE])
    response = await aiohttp.request('GET', host)
    body = await response.json()
    return body


if __name__ == '__main__':
    sys.exit(int(main(*sys.argv[1:])))