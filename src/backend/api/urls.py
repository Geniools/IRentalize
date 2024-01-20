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
    path('chat/', include('backend.chat.urls'), name='chat'),
    # User
    path('user-profile-image/', views.UserProfileImageUpdateAPI.as_view(), name='user-profile-image'),
    path('user-listing-reservations/', views.UserReservationUpdateAPI.as_view(), name='user-listing-reservations'),
    path('user-listing-reservation-status/<int:pk>/', views.UserReservationStatusUpdateAPI.as_view(), name='user-listing-reservation-status'),
    path('user-listing-orders/', views.UserOrdersViewAPI.as_view(), name='user-listing-orders'),
    # Other
    path('listing-reservation/', views.ReservationCreateAPIView.as_view(), name='listing-reservation'),
    path('contact-us/', views.ContactUsView.as_view(), name='contact-us'),
]

# TODO: Add subdomain for "student_fiance" - "student.domain.com"
# TODO: Refactor the backend for the api to be more modular
