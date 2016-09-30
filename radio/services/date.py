import pytz
from pytz import timezone
from datetime import datetime

MORNING = 'morning'
DAY = 'day'
EVENING = 'evening'


def get_day_time():
    """
    Discover part of the day based on zone and hour
    Returns: `str`

    """
    zone = timezone(pytz.country_timezones['ua'][0])
    hour = zone.localize(datetime.now()).hour

    if 6 <= hour <= 12:
        time_of_day = MORNING
    elif 12 <= hour <= 18:
        time_of_day = DAY
    elif 6 > hour or hour > 18:
        time_of_day = EVENING

    return time_of_day
