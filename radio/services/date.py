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

    # small tests for local filter change
    # during test do not forged about day_time={}

    # if day_time.get('day_time'):
    #     time = day_time.get('day_time')
    #     if time == MORNING:
    #         day_time['day_time'] = DAY
    #     elif time == DAY:
    #         day_time['day_time'] = EVENING
    #     elif time == EVENING:
    #         day_time['day_time'] = MORNING
    # else:
    #     day_time['day_time'] = 'morning'
    #
    #
    # print('==' * 80)
    # print(day_time['day_time'])
    # print('==' * 80)
    # return day_time['day_time']

    zone = timezone(pytz.country_timezones['ua'][0])
    hour = zone.localize(datetime.now()).hour

    if 6 <= hour <= 12:
        time_of_day = MORNING
    elif 12 <= hour <= 18:
        time_of_day = DAY
    elif 6 > hour or hour > 18:
        time_of_day = EVENING

    return time_of_day
