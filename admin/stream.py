from bson.json_util import dumps
from aiohttp import web
from radio.models import Stream


class Collection(web.View):

    def encode(self, data):
        return dumps(data, indent=4).encode('utf-8')

    async def get(self):
        quote = Quote(db=self.request.db, data={})
        all_quotes = await quote.all()
        return web.Response(status=200,
                            body=self.encode(
                                data={'quotes': all_quotes}),
                            content_type='application/json')

    async def post(self):
        data = await self.request.post()
        quote = Quote(self.request.db, data)
        result = await quote.create_quote()
        all_quotes = await quote.all()
        return web.Response(status=200,
                            body=self.encode(
                                data={'quotes': all_quotes}),
                            content_type='application/json')