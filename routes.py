from radio.views import HomeView, push_current_track
from auth.views import Login, SignOut, SignIn


routes = [
    ('GET', '/', HomeView,  'home'),
    ('GET', '/api/track_stream',  push_current_track, 'track_stream'),
    ('*',   '/login',   Login,     'login'),
    ('*', '/signin', SignIn, 'signin'),
    ('*',   '/signout', SignOut,   'signout'),
]
