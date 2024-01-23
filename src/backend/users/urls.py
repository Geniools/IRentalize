from django.urls import path
from rest_framework import routers

from backend.users import views

router = routers.DefaultRouter()

urlpatterns = [
    path('user-profile-image/', views.UserProfileImageUpdateAPI.as_view(), name='user-profile-image'),
]
