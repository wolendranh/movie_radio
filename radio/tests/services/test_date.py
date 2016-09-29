import datetime
from unittest import mock, TestCase

from radio.services.date import (
    get_day_time,
    DAY,
    EVENING,
    MORNING
)


class DateServiceTestCase(TestCase):

    def test_evening(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 22)
            result = get_day_time()
            print(result)
            assert result == EVENING

    def test_morning(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 6)
            result = get_day_time()
            assert result == MORNING

    def test_day(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 14)
            result = get_day_time()
            assert result == DAY

    def test_day_time_in_middle(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 16)
            result = get_day_time()
            assert result == DAY

    def test_evening_time_midnight(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 0)
            result = get_day_time()
            assert result == EVENING

    def test_evening_time_night(self):
        with mock.patch('radio.services.date.datetime') as mock_date:
            mock_date.now.return_value = datetime.datetime(2016, 6, 30, 3)
            result = get_day_time()
            assert result == EVENING
