import json
import os
import logging
import asyncio
import sys
import getopt

import aiohttp
from aioredis import create_redis


METADATA_FILE = 'status-json.xsl'


def main(host, port):
    logging.info('Got params connection host {0}, port {1}'.format(host, port))
    loop = asyncio.get_event_loop()
    while  True:
        title = loop.run_until_complete(get_current_song(host, port))
        if title:
            redis = loop.run_until_complete(create_redis(('localhost', 6379)))
            loop.run_until_complete(redis.publish('CHANNEL', json.dumps(title)))
    loop.close()
    return False


async def get_current_song(host, port):
    if port:
        host = ':'.join([host, port])
    host = '/'.join([host, METADATA_FILE])
    response = await aiohttp.request('GET', host)
    body = await response.json()
    try:
        title = body['icestats']['source'].get('title')
    except KeyError:
        return None
    await asyncio.sleep(2)
    return title


if __name__ == '__main__':
    """
    in case if script is executed standalone we need to
    have ability to import settings from project if script is executed on the same
    machine as app
    If no - use  default values
    """
    project_path = os.path.abspath(os.path.join(os.getcwd(), os.pardir))
    sys.path.append(project_path)
    opts, args = getopt.getopt(sys.argv[1:], shortopts="h:p:", longopts=['host', 'port'])
    if opts:
        for opt, arg in opts:
            if opt in ['h', 'host']:
                host = arg
            elif opt in ['p', 'port']:
                port = arg
        logging.info('Using settings from sys args')
    else:
        try:
            from movie_radio.settings import SITE_PORT, SITE_HOST
            host, port = SITE_HOST, SITE_PORT
            logging.info('Using imported settings')
        except ImportError:
            host, port = 'http://barmaglot.com', '8000'
            logging.info('Using default settings')
    try:
        main(port=port, host=host)
    except KeyboardInterrupt:
        logging.info('Task finished!')
