from django.urls import path, include
from rest_framework import routers

from backend.api import views

# Create a router and register all the viewsets
router = routers.DefaultRouter()
router.register(r'reservations', views.ReservationViewSet)
router.register(r'availabilities', views.AvailabilityViewSet)
router.register(r'listings', views.ListingViewSet)
router.register(r'listing-images', views.ListingImageViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'users', views.UserViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
