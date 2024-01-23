from django.urls import path, include
from rest_framework import routers

from backend.bookings import views

router = routers.DefaultRouter()

router.register(r'user-listing-availabilities', views.UserListingAvailabilityViewSet)

urlpatterns = [
    path('user-listing-reservation-status/<int:pk>/', views.UserListingReservationStatusUpdateAPI.as_view(), name='user-listing-reservation-status'),
    path('user-listing-reservations/', views.UserListingReservationAPI.as_view(), name='user-listing-reservations'),
    path('user-listing-orders/', views.UserOrdersViewAPI.as_view(), name='user-listing-orders'),
    path('listing-reservation/', views.ReservationCreateAPIView.as_view(), name='listing-reservation'),
    path('', include(router.urls)),
]
