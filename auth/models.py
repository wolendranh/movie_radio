import os
import binascii
from datetime import datetime
from bson.objectid import ObjectId

from config.settings import USER_COLLECTION, TOKEN_COLLECTION
from radio_db.models import BaseModel
from auth.services import (
    get_user,
    create_user,
    check_user_auth
)


class Token(BaseModel):
    """
    The default authorization token model.
    """
    def __init__(self, db, data, **kwargs):
        super().__init__(db=db, collection=TOKEN_COLLECTION)
        self.key = None
        self.user_id = ObjectId(data.get('user_id'))

    async def get_or_create(self, *args, **kwargs):
        return await super().get_or_create(parameters={'user': self.user_id})

    async def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()

        parameters = {'user': self.user_id, 'created': self.created, 'key': self.key}
        return await super().save(parameters)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()


class User(BaseModel):
    """
    default User model
    """

    def __init__(self, db, data, **kwargs):
        super().__init__(db=db, collection=USER_COLLECTION)
        self.email = data.get('email')
        self.login = data.get('login')
        self.password = str.encode(data.get('password'))
        self.id = ObjectId(data.get('id'))

    async def get_login(self, **kwargs):
        user = await get_user(self.collection, self.id)
        return user.get('email')

    async def create_user(self, **kwargs):
        user = await check_user_auth(db=self.db, email=self.email, password=self.password)
        if not user:
            user_data = {'email': self.email,
                         'password': self.password,
                         'id': self.id}
            result = await create_user(collection=self.collection,
                                       user_data=user_data)
        else:
            result = 'User exists'
        return result
