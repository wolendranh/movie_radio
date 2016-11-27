import logging

from aiohttp import ClientSession, BasicAuth

from radio.services.exceptions import ImproperlyConfiguredServiceError
from config.settings import (
    MAIL_GUN_API_KEY,
    MAIL_GUN_API_URL,
    INFO_EMAIL,
    FEEDBACK_SUBJECT
)

server_logger = logging.getLogger('aiohttp.server')


async def send_mail(sender, body):
    """
    Args:
        sender: email sender
        body: text body of email that in going to be sent

    """
    if not all([MAIL_GUN_API_KEY, INFO_EMAIL, MAIL_GUN_API_URL]):
        raise ImproperlyConfiguredServiceError('Email sending variables are not defined! Please check your settings!')

    try:
        with ClientSession() as client:
            await client.post(
                MAIL_GUN_API_URL,
                auth=BasicAuth("api", MAIL_GUN_API_KEY),
                data={"from": sender,
                      "to": INFO_EMAIL,
                      "subject": FEEDBACK_SUBJECT,
                      "text": body}
            )
    except Exception as e:
        # log exception as we don't have anything else to do here.
        # raising exception doesn't make much sense. At least now.
        server_logger.error('Error occurred while sending email {}!'.format(str(e)))
