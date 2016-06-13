from django.conf.urls import url
from .views import RadioHomePage


urlpatterns = [
    url(r'^$', RadioHomePage.as_view(), name="radio_home")
]
