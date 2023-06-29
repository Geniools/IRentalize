from django.urls import path

from backend.main.views import index

urlpatterns = [
    path('', index, name='index'),
]
