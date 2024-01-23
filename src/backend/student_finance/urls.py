from django.urls import path, include
from rest_framework import routers

from backend.student_finance import views

router = routers.DefaultRouter()

router.register(r'requests', views.RequestCreateAPIView, basename='requests')

urlpatterns = [
    path('', include(router.urls)),
]
