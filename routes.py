from radio.views import HomeView, push_current_track
from auth.views import Login, SignOut, SignIn
from admin.views import AdminListView, QuoteAdminListView, QuoteAdminNewView


routes = [
    ('GET', '/', HomeView,  'home'),
    ('GET', '/api/track_stream',  push_current_track, 'track_stream'),
    ('*',   '/login',   Login,     'login'),
    ('*', '/signin', SignIn, 'signin'),
    ('*',   '/signout', SignOut,   'signout'),
    ('*', '/admin', AdminListView, 'admin'),
    ('*', '/admin/quote', QuoteAdminListView, 'quote_list'),
    ('*', '/admin/quote/add', QuoteAdminNewView, 'quote_new'),
]
