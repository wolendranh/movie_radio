# Create your views here.
from django.views.generic import TemplateView


class RadioView(TemplateView):
    template_name = 'player/player.html'
