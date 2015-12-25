from django.conf.urls import url, include
from player import views

urlpatterns = [
    url(r'^', views.RadioView.as_view()),
]
