from bson.json_util import dumps
from aiohttp import web
from admin.models import Stream


class Collection(web.View):

    def encode(self, data):
        return dumps(data, indent=4).encode('utf-8')

    async def get(self):
        stream = Stream(db=self.request.db, data={})
        queryset = await stream.all()
        return web.Response(status=200,
                            body=self.encode(
                                data={'streams': queryset}),
                            content_type='application/json')

    async def post(self):
        data = await self.request.post()
        stream_data = {'stream_ip': data['stream_ip'], 'active': data['active']}
        stream = Stream(self.request.db,
                        data=stream_data)
        stream = await stream.get_or_create(parameters=stream_data)

        return web.Response(status=200,
                            body=self.encode(
                                data={'stream': stream}),
                            content_type='application/json')
