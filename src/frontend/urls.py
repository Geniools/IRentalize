from django.urls import path

from frontend import views

urlpatterns = [
    # Pages
    path('', views.index, name='index'),
    path('about-us/', views.index, name='about_us'),
    path('contact-us/', views.index, name='contact_us'),
    # Dashboard
    path('account/', views.index, name='account'),
    path('account/user-details/', views.index, name='user-details'),
    path('account/user-orders/', views.index, name='user-orders'),
    path('account/user-orders/<int:id>', views.index, name='user-order-details'),
    path('account/user-posts/', views.index, name='user-posts'),
    path('account/user-posts/<int:id>', views.index, name='user-posts-details'),
    path('account/user-recently-viewed/', views.index, name='user-recently-viewed'),
    # Authentication
    path('login/', views.index, name='login'),
    path('register/', views.index, name='register'),
    path('activate/<str:uid>/<str:token>/', views.index, name='activate'),
    path('password-reset/', views.index, name='register'),
    path('password-reset/confirm/<str:uid>/<str:token>/', views.index, name='password_reset_confirm'),
    path('username-reset/', views.index, name='username_reset'),
    path('username-reset/confirm/<str:uid>/<str:token>/', views.index, name='username_reset_confirm'),
]
