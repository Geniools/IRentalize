from django.urls import path, include

urlpatterns = [
    path('', include('backend.listing.urls')),
    path('', include('backend.main.urls')),
]
