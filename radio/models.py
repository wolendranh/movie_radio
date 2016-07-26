from settings import QUOTE_COLLECTION


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
