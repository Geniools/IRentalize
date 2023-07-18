from django.urls import path

from frontend import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about-us/', views.index, name='about_us'),
    path('account/', views.index, name='account'),
    path('login/', views.index, name='login'),
    path('register/', views.index, name='register'),
    path('activate/<str:uid>/<str:token>/', views.index, name='activate'),
    path('password-reset/', views.index, name='register'),
    path('password-reset/confirm/<str:uid>/<str:token>/', views.index, name='password_reset_confirm'),
]
