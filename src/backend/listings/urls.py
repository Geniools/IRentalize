from django.urls import path, include
from rest_framework import routers

from backend.listings import views

router = routers.DefaultRouter()

router.register(r'categories', views.CategoryViewSet)
router.register(r'listings', views.ListingViewSet)
# Listing management (api endpoints used only when interacting with the listings attributed to the logged-in user)
router.register(r'user-listings', views.UserListingViewSet)
router.register(r'user-listing-images', views.UserListingImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
