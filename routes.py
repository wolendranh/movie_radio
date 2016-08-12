from radio.views import HomeView, push_current_track
from auth.views import Login, SignOut, AuthTokenView
from admin.views import (
    AdminListView,
    QuoteAdminListView,
    QuoteAdminNewView,
    Collection
)


routes = [
    ('GET', '/api/track_stream', push_current_track, 'track_stream'),
    ('GET', '/', HomeView,  'home'),
    ('*',   '/login',   Login,     'login'),
    ('*',   '/signout', SignOut,   'signout'),
    # ('*', '/admin', AdminListView, 'admin'),
    # ('*', '/admin/quote', QuoteAdminListView, 'quote_list'),
    # # ('*', '/admin/quote/add', QuoteAdminNewView, 'quote_new'),
]

API_ROUTES = [
    ('POST', '/api/get-auth-token', AuthTokenView, 'get-token'),
    ('*', '/api/quotes', Collection, 'quote_collection'),
]

routes.extend(API_ROUTES)
