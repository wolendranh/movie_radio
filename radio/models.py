from datetime import datetime
from settings import STREAM_COLLECTION, QUOTE_COLLECTION
from bson.objectid import ObjectId


class Stream:
    def __init__(self, db, data, **kwargs):
        self.db = db
        self.collection = self.db[STREAM_COLLECTION]
        self.stream_ip = data.get('stream_ip')
        self.name = data.get('name')
        self.id = data.get('id')
        self.user_id = ObjectId(data.get('user_id'))
        self.created = datetime.now()

    async def get_or_create(self, *args, **kwargs):
        stream = await get_stream(collection=self.collection, user_id=self.user_id, name=self.name)
        if stream:
            return stream
        return await self.save()

    async def save(self, *args, **kwargs):

        stream_data = {'user': self.user_id, 'created': self.created, 'key': self.key}
        return await create_stream(collection=self.collection, stream_data=stream_data)


class Quote:

    def __init__(self, db, data, **kwargs):
        self.db = db
        self.collection = self.db[QUOTE_COLLECTION]
        self.text = data.get('text')
        self.phrase_of_day = data.get('phrase_of_day', False)
        self.id = data.get('id')

    async def check_user(self, **kwargs):
        return await self.collection.find_one({'text': self.text})

    async def create_quote(self, **kwargs):
        quote = await self.check_user()
        if not quote:
            result = await self.collection.insert({'text': self.text})
        else:
            result = 'Quote exists'
        return result

    async def all(self):
        result = self.collection.find()
        return await result.to_list(length=None)
