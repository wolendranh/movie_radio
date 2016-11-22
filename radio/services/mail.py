from config.settings import MAIL_GUN_API_KEY, MAIL_GUN_API_URL
import requests


def send_simple_message(sender, body):
    """
    Args:
        sender: email sender
        body: text body of email that in going to be sent

    Returns: http code

    """
    # TODO: get rid of requests here. Because it is sync
    return requests.post(
        MAIL_GUN_API_URL,
        auth=("api", MAIL_GUN_API_KEY),
        data={"from": sender,
              "to": "Yura <hulpa.yura@gmail.com>",
              "subject": "This is a test",
              "text": body})