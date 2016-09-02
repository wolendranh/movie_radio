import os
import binascii
from datetime import datetime
from bson.objectid import ObjectId
from settings import USER_COLLECTION, TOKEN_COLLECTION
from auth.services import (
    get_user,
    create_user,
    check_user_auth,
    create_token,
    get_token
)

class BaseModel:
    """
    Base model to interact with Mongo DB
    """
    # TODO: implement base functionality that should fit for all models

    def __init__(self, collection):
        self.collection = collection
        self.created = datetime.now()

    async def get(self, collection, parameters):
        """
        Args:
            collection: mongo DB collection
            parameters: dict of lookup attrs to make query

        Returns: result of Mongo DB query

        """
        return await collection.find_one(parameters)

    async def get_or_create(self, parameters):
        db_object = await self.get(collection=self.collection, parameters=parameters)
        if db_object:
            return db_object
        return await self.save(parameters)

    async def create_object(self, parameters):
        return await self.collection.insert(parameters)

    async def save(self, parameters):
        object_id =  await self.create_object(parameters=parameters)
        return await self.get(collection=self.collection, parameters={'_id': object_id})

    async def all(self):
        result = self.collection.find()
        return await result.to_list(length=None)

    async def filter(self, parameters):
        result = self.collection.find(parameters)
        return await result.to_list(length=None)


