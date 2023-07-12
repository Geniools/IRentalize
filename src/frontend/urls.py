from django.urls import path

from frontend import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about-us/', views.index, name='about_us'),
    path('accounts/login/', views.index, name='login'),
]
