from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path("api/chat", ChatConsumer.as_asgi()),
]
