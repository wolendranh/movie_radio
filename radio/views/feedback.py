from aiohttp import web
import radio.services.mail


class Collection(web.View):
    """
    API view that is used for email feedback post handling
    """

    async def post(self):
        data = await self.request.post()
        mail_data = {'sender': data['sender_email'], 'body': data['body']}

        await radio.services.mail.send_mail(**mail_data)
        return web.Response(status=200,
                            content_type='application/json')
