from django.db import models


class ChatRoom(models.Model):
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE)
    guest = models.ForeignKey('users.User', on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Chat: {self.guest} - {self.listing}'


class ChatMessage(models.Model):
    chat = models.ForeignKey('chat.ChatRoom', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Message from {self.chat}'
