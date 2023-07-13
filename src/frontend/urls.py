from django.urls import path

from frontend import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about-us/', views.index, name='about_us'),
    path('account/', views.index, name='account'),
    path('account/login/', views.index, name='login'),
    path('account/register/', views.index, name='register'),
    path('account/password-reset/', views.index, name='register'),
]
