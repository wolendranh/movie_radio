from bson.objectid import ObjectId
from settings import USER_COLLECTION
from auth.services import get_user, create_user, check_user_auth


class User:

    def __init__(self, db, data, **kwargs):
        self.db = db
        self.collection = self.db[USER_COLLECTION]
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
