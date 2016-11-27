import logging

from aiohttp import web

import radio.services.mail

server_logger = logging.getLogger('aiohttp.server')


class Collection(web.View):
    """
    API view that is used for email feedback post handling
    """

    async def post(self):
        data = await self.request.post()
        mail_data = {'sender': data['sender_email'], 'body': data['body']}

        if mail_data.get('sender') and mail_data.get('body'):
            await radio.services.mail.send_mail(**mail_data)
        else:
            logging.info('Sender or Body were not provided. Skipping sending!')
        return web.Response(status=200,
                            content_type='application/json')
