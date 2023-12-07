from django.urls import path, include
from rest_framework import routers

from backend.api import views

# Create a router and register all the viewsets
router = routers.DefaultRouter()

# Listings
router.register(r'categories', views.CategoryViewSet)
router.register(r'listings', views.ListingViewSet)
# User
router.register(r'user-listings', views.UserListingViewSet)
router.register(r'user-listing-images', views.UserListingImageViewSet)
router.register(r'user-listing-availabilities', views.UserAvailabilityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # User
    path('user-profile-image/', views.UserProfileImageUpdateAPI.as_view(), name='user-profile-image'),
    path('user-listing-reservations/', views.UserReservationUpdateAPI.as_view(), name='user-listing-reservations'),
    # Other
    path('listing-reservation/', views.ReservationAPIView.as_view(), name='listing-reservation'),
    path('contact-us/', views.ContactUsView.as_view(), name='contact-us'),
]
