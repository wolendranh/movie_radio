SITE_PORT = '8080'
SITE_HOST = 'localhost'

MONGO_DB_NAME = 'barmaglot'
MONGO_HOST = 'localhost'

USER_COLLECTION = 'users'
QUOTE_COLLECTION = 'quotes'
TOKEN_COLLECTION = 'tokens'

SECRET_KEY = b'\xf4cx\xae\x97P\xff*Kj\xe1\xf1\xa4\x1a\xad\xb7\xcb~\xe44PDq\xf4\x11q\xf0\xecp\xb9\xc3\x19'

try:
    from local_settings import *
except:
    pass