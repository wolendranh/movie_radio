from bson.json_util import dumps
from aiohttp import web
from bson.objectid import ObjectId

from admin.models import Stream
from admin.serializers.stream import serialize as serialize_stream



class Collection(web.View):

    def encode(self, data):
        return dumps(data, indent=4).encode('utf-8')


    def get_filters(self):
        return

    async def get(self):
        stream = Stream(db=self.request.db, data={})
        queryset = await stream.all()
        return web.Response(status=200,
                            headers={'Content-Range': '16'},
                            body=self.encode(
                                data=map(serialize_stream, queryset)),
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

    async def delete(self):
        data = await self.request.post()
        stream_data = {'_id': ObjectId(data['stream_id'])}
        stream = Stream(self.request.db,
                        data=stream_data)
        result = await stream.delete(parameters=stream_data)
        return web.Response(status=200,
                            body=self.encode(
                                data={'result': result}),
                            content_type='application/json')


class One(web.View):

    def encode(self, data):
        return dumps(data, indent=4).encode('utf-8')

    async def get(self):
        stream = Stream(db=self.request.db, data={})
        stream_object = await stream.get(parameters={'active': 'true'})
        return web.Response(status=200,
                            body=self.encode(
                                data={'stream': stream_object}),
                            content_type='application/json')
