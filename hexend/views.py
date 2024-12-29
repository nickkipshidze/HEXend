from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

messages = []

class MessageListView(APIView):
    def get(self, request):
        return Response({"messages": messages})

    def post(self, request):
        new_message = request.data.get("message")
        print(new_message)
        if new_message:
            # Save the message (if using an in-memory list or database)
            messages.append(new_message)
            
            # Notify WebSocket clients
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "chat_room",
                {
                    "type": "chat_message",
                    "message": new_message
                }
            )
            
            return Response({"status": "Message added"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)
