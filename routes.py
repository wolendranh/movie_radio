from radio.views import HomeView, push_current_track
from auth.views import Login, SignOut, AuthTokenView
from admin.views import (
    AdminListView,
    QuoteAdminListView,
    QuoteAdminNewView,
    Collection
)


API_ROUTES = [
    ('POST', '/api/get-auth-token', AuthTokenView, 'get-token'),
    ('GET', '/api/track_stream', push_current_track, 'track_stream'),
    ('*', '/api/quotes', Collection, 'quote_collection'),
    ('*', '/api/streams', Collection, 'stream_collection'),
    ('POST',   '/login',   Login,     'login'),
]

routes = [
    ('GET', '/{tail:.*}', HomeView,  'home')
]

# routes.extend(API_ROUTES)



# routes = [
#     ('GET', '/api/track_stream', push_current_track, 'track_stream'),
#     ('GET', '/', HomeView,  'home'),
#     ('*',   '/signout', SignOut,   'signout'),
#     ('*', '/admin', AdminListView, 'admin'),
#     # ('*', '/admin/quote', QuoteAdminListView, 'quote_list'),
#     # # ('*', '/admin/quote/add', QuoteAdminNewView, 'quote_new'),
# ]
#

#
