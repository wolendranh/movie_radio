from radio.views import HomeView


routes = [
    ('GET', '/', HomeView,  'home'),
    # ('GET', '/ws',      WebSocket, 'chat'),
]