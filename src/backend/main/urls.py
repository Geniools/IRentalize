from django.urls import path

from backend.main import views

urlpatterns = [
    path('contact-us/', views.ContactUsView.as_view(), name='contact-us'),
]
