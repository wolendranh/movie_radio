from radio.views import HomeView, push_current_track


routes = [
    ('GET', '/', HomeView,  'home'),
    ('GET', '/api/track_stream',  push_current_track, 'track_stream'),
]