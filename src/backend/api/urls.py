from django.urls import path, include
from rest_framework import routers

# Create a router and register all the viewsets
router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    # Main
    path('', include('backend.main.urls'), name='main'),
    # User
    path('', include('backend.users.urls'), name='users'),
    # Listings
    path('', include('backend.listings.urls'), name='listings'),
    # Bookings
    path('', include('backend.bookings.urls'), name='bookings'),
    # Chat
    path('chat/', include('backend.chat.urls'), name='chat'),
]
