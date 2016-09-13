from auth.utils import check_password, get_hashed_password
from config.settings import USER_COLLECTION

async def create_user(collection, user_data):
    # here will iteraction on storing user with hashing pass into Mongo
    pass_hash = get_hashed_password(user_data['password'])
    return await collection.insert({'email': user_data['email'],
                                    'hash': pass_hash,
                                    '_id': user_data['id']})


async def create_token(collection, token_data):
    # save token into db
    return await collection.insert(token_data)

async def get_token(collection, user_id):
    # get Token based on a User identifier
    return await collection.find_one({'user': user_id})

async def get_user(collection, user_id):
    return await collection.find_one({'_id': user_id})

async def get_by_email(collection, email):
    return await collection.find_one({'email': email})


async def check_user_auth(db, email, password):
    collection = db[USER_COLLECTION]
    user = await get_by_email(collection=collection, email=email)
    if user:
        hash = user['hash']
        if check_password(password, hash):
            return user
    return False
