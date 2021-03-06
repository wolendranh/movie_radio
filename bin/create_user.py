#!/usr/bin/env python3
import argparse
import asyncio

from auth.models import User
from motor import motor_asyncio as ma
from config.settings import MONGO_HOST, MONGO_DB_NAME


async def create_super_user(*args, **kwargs):
    """
    Small script that allows to take email and pass as arguments
     and creates User Instance
    Returns: Uer instance

    """
    parser = argparse.ArgumentParser(description='Process new superuser data...')
    parser.add_argument('--email', type=str)
    parser.add_argument('--password', type=str)

    params = parser.parse_args()
    mongo_client = ma.AsyncIOMotorClient(MONGO_HOST)
    mongo_db = mongo_client[MONGO_DB_NAME]
    user = await User(db=mongo_db, data={'password': params.password,
                                         'email': params.email}).create_user()
    return user

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(create_super_user())
