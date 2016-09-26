import logging

import asyncio
import aiohttp_jinja2
from aiohttp import web
from aiohttp_session import session_middleware
from aiohttp_session.cookie_storage import EncryptedCookieStorage
import aiohttp_debugtoolbar
import jinja2
from motor import motor_asyncio as ma

from routes import routes, API_ROUTES
import config.settings as settings
from middlewares import authorize, db_handler


server_logger = logging.getLogger('aiohttp.server')

async def shutdown(serv, app, handler):
    server_logger.info('Closing connection to Mongo...')
    app.db.connection.close()
    server_logger.info('Connection to Mongo was closed.')

async def init(loop):

    logging.basicConfig(level=logging.DEBUG)
    # maybe later add authorize middleware
    app = web.Application(loop=loop,middlewares=[
        session_middleware(EncryptedCookieStorage(settings.SECRET_KEY)),
        db_handler,
        ], debug=True)

    handler = app.make_handler()
    aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('templates'))

    # route part
    app.router.add_static('/static', 'static', name='static')
    app.router.add_static('/node_modules', 'node_modules', name='static_dist')
    for api_route in API_ROUTES:
        app.router.add_route(api_route[0], api_route[1], api_route[2], name=api_route[3])
    for route in routes:
        app.router.add_route(route[0], route[1], route[2], name=route[3])
    # end route part
    # db connect
    app.client = ma.AsyncIOMotorClient(settings.MONGO_HOST)
    app.db = app.client[settings.MONGO_DB_NAME]

    # bypass settings into app
    app.settings = settings
    app.in_debug = settings.DEBUG

    # if app.in_debug:
    #     aiohttp_debugtoolbar.setup(app)

    # end db connect
    serv_generator = loop.create_server(handler,
                                        settings.SITE_HOST,
                                        settings.SITE_PORT)
    return serv_generator, handler, app

loop = asyncio.get_event_loop()
serv_generator, handler, app = loop.run_until_complete(init(loop))
serv = loop.run_until_complete(serv_generator)

server_logger.info('start server %s' % str(serv.sockets[0].getsockname()))
try:
    loop.run_forever()
except KeyboardInterrupt:
    server_logger.info('Closing server ...')
finally:
    loop.run_until_complete(shutdown(serv, app, handler))
    loop.close()
    server_logger.info('Server is off')
