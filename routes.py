from radio.views import home, track_info, track_info_sse
from auth.views import Login, AuthTokenView
from admin.views import quote, stream


API_ROUTES = [
    ('POST', '/api/get-auth-token', AuthTokenView, 'get-token'),
    ('GET', '/api/track_stream', track_info_sse.push_current_track, 'track_stream'),
    ('GET', '/api/track_info', track_info.IcecastTrackView, 'track_info'),
    ('*', '/api/quotes', quote.Collection, 'quote_collection'),
    ('*', '/api/streams', stream.Collection, 'stream_collection'),
    ('GET', '/api/stream', stream.One, 'stream_one'),
    ('POST',   '/login',   Login,     'login'),
]

routes = [
    ('GET', '/{tail:.*}', home.HomeView,  'home')
]
