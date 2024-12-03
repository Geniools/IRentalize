from django.urls import path

from frontend import views

urlpatterns = [
    # Home Page
    path('', views.index, name='index'),
    # Filtered Listing Pages
    # path('housing/', views.index, name='housing_listings'),
    # path('furniture/', views.index, name='furniture_listings'),
    # path('accessories/', views.index, name='accessories_listings'),
    # Listing Details Page
    path('listing/<int:id>/', views.index, name='listing_details'),
    # path('listing/<int:id>/all-images/', views.index, name='listing_all_images'),
    # "Main" Pages
    # path('about-us/', views.index, name='about_us'),
    path('contact-us/', views.index, name='contact_us'),
    # Chat
    # path('chat/', views.index, name='chat'),
    # path('chat/host/', views.index, name='chat-host'),
    # path('chat/guest/', views.index, name='chat-guest'),
    # path('chat/host/<str:room_name>/', views.index, name='chat-host-room'),
    # path('chat/guest/<str:room_name>/', views.index, name='chat-guest-room'),
    # Dashboard
    # path('account/', views.index, name='account'),
    # path('account/user-details/', views.index, name='user-details'),
    # path('account/user-orders/', views.index, name='user-orders'),
    # path('account/user-orders/<int:id>/', views.index, name='user-order-details'),
    # path('account/user-posts/', views.index, name='user-posts'),
    # path('account/user-posts/<int:id>/', views.index, name='user-posts-details'),
    # path('account/user-reservations/', views.index, name='user-reservations'),
    # path('account/user-reservations/<int:id>/', views.index, name='user-reservations-details'),
    # path('account/user-recently-viewed/', views.index, name='user-recently-viewed'),
    # path('account/change-profile-picture/', views.index, name='change-profile-picture'),
    # Authentication
    # path('login/', views.index, name='login'),
    # path('register/', views.index, name='register'),
    # path('activate/<str:uid>/<str:token>/', views.index, name='activate'),
    # path('password-reset/', views.index, name='register'),
    # path('password-reset/confirm/<str:uid>/<str:token>/', views.index, name='password_reset_confirm'),
    # path('username-reset/', views.index, name='username_reset'),
    # path('username-reset/confirm/<str:uid>/<str:token>/', views.index, name='username_reset_confirm'),
]
