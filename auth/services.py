from auth.utils import encrypt


def create_user(collection, **parameters):
    # here will iteraction on storing user with hashing pass into Mongo
    #
    # await self.collection.insert()