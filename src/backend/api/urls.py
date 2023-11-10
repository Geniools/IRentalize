from django.urls import path, include
from rest_framework import routers

from backend.api import views

# Create a router and register all the viewsets
router = routers.DefaultRouter()

# Listings
router.register(r'categories', views.CategoryViewSet)
router.register(r'listings', views.ListingViewSet)
router.register(r'listing-images', views.ListingImageViewSet)
# User
router.register(r'user-listings', views.UserListingViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('user-profile-image/', views.UserProfileImageUpdateAPI.as_view(), name='user-profile-image'),
    path('contact-us/', views.ContactUsView.as_view(), name='contact-us'),
]
