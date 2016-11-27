import logging

from aiohttp import web

import radio.services.mail
from config.settings import INFO_EMAIL

server_logger = logging.getLogger('aiohttp.server')


class Collection(web.View):
    """
    API view that is used for email feedback post handling
    """

    async def post(self):
        data = await self.request.post()
        mail_data = {'sender': data['sender_email'], 'body': data['body']}

        if not mail_data.get('sender'):
            # in case when sender want's to stay anonymous, we just use default mail
            mail_data['sender'] = INFO_EMAIL

        if mail_data.get('sender') and mail_data.get('body'):
            await radio.services.mail.send_mail(**mail_data)
        else:
            logging.info('Sender or Body were not provided. Skipping sending!')
        return web.Response(status=200,
                            content_type='application/json')
