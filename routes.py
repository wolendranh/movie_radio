from radio.views import home, track_info, feedback
from auth import views as auth_views
from admin.views import stream


API_ROUTES = [
    ('POST', '/api/get-auth-token', auth_views.AuthTokenView, 'get-token'),
    # commented out untill good times
    # ('GET', '/api/track_stream', track_info_sse.push_current_track, 'track_stream'),
    ('POST', '/api/feedback', feedback.Collection, 'feedback'),
    ('GET', '/api/track_info', track_info.IcecastTrackView, 'track_info'),
    ('*', '/api/streams', stream.Collection, 'stream_collection'),
    ('GET', '/api/stream', stream.One, 'stream_one'),
    ('POST',   '/login',   auth_views.Login,     'login'),
]

routes = [
    ('GET', '/{tail:.*}', home.HomeView,  'home')
]
