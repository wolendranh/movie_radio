SITE_PORT = '8080'
SITE_HOST = '127.0.0.1'

STREAM_HOST = 'https://www.radiobarmaglot.com'
STREAM_PORT = '20000'

MONGO_DB_NAME = 'barmaglot'
MONGO_HOST = 'localhost'

USER_COLLECTION = 'users'
QUOTE_COLLECTION = 'quotes'
STREAM_COLLECTION = 'streams'
TOKEN_COLLECTION = 'tokens'

DEBUG = True

SECRET_KEY = b'\xf4cx\xae\x97P\xff*Kj\xe1\xf1\xa4\x1a\xad\xb7\xcb~\xe44PDq\xf4\x11q\xf0\xecp\xb9\xc3\x19'

# mail related
INFO_EMAIL = "info@radiobarmaglot.com"
FEEDBACK_SUBJECT = "Barmaglot feedback"


# 3-rd Party API settings
MAIL_GUN_API_KEY = None
MAIL_GUN_API_URL = "https://api.mailgun.net/v3/sandbox634f2c973aa64b688e61e82dba4f72f1.mailgun.org/messages"

# should come from local settings
GOOGLE_ANALYTICS = None

try:
    from .local_settings import *
except:
    pass
