from radio.views import HomeView, push_current_track
from auth.views import Login, SignOut
from admin.views import (
    AdminListView,
    QuoteAdminListView,
    QuoteAdminNewView,
    Collection
)


routes = [
    ('GET', '/', HomeView,  'home'),
    ('GET', '/api/track_stream',  push_current_track, 'track_stream'),
    ('*',   '/login',   Login,     'login'),
    ('*',   '/signout', SignOut,   'signout'),
    ('*', '/admin', AdminListView, 'admin'),
    ('*', '/admin/quote', QuoteAdminListView, 'quote_list'),
    # ('*', '/admin/quote/add', QuoteAdminNewView, 'quote_new'),
    ('*', '/api/quotes', Collection, 'quote_collection'),
]
