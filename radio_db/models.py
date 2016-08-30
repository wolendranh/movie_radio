import os
import binascii
from datetime import datetime
from bson.objectid import ObjectId
from settings import USER_COLLECTION, TOKEN_COLLECTION


class BaseModel:
    """
    Base model to interact with Mongo DB
    """

    def __init__(self, collection):
        super(BaseModel)
        self.collection = collection
        self.created = datetime.now()

    async def get_or_create(self, *args, **kwargs):
        # data fetch or create
        return await self.save()

    async def create_object(self, *args, **kwargs):
        raise NotImplementedError

    async def save(self, *args, **kwargs):
        return await self.create_object(collection=self.collection, data=self.data)


