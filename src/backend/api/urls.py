from django.urls import path, include
from rest_framework import routers

from backend.api import views

# Create a router and register all the viewsets
router = routers.DefaultRouter()
router.register(r'listings', views.ListingViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', views.LoginView.as_view(), name='api_login'),
    path('auth/', include('knox.urls')),
    path('register/', views.RegisterView.as_view(), name='api_register'),
]
