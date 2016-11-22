from aiohttp import web
import radio.services.mail


class Collection(web.View):
    """
    API view that is used for email feedback post handling
    """

    async def post(self):
        data = await self.request.post()
        mail_data = {'sender': data['sender_email'], 'body': data['body']}

        try:
            radio.services.mail.send_simple_message(**mail_data)
        except Exception as e:
            print(e)
        return web.Response(status=200,
                            content_type='application/json')
