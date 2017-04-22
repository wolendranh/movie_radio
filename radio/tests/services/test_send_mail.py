import asyncio
from unittest import TestCase

from radio.services.mail import send_mail
from radio.services.exceptions import ImproperlyConfiguredServiceError
import radio.services.mail


class SendMailServiceTestCase(TestCase):

    def setUp(self):
        self.loop = asyncio.get_event_loop()
        asyncio.set_event_loop(None)
        radio.services.mail.MAIL_GUN_API_KEY = None

    def test_settings_not_set(self):
        with self.assertRaises(ImproperlyConfiguredServiceError) as e:
            self.loop.run_until_complete(send_mail(
                'test@mail.com',
                'body'
            ))
