from django.urls import path, include

urlpatterns = [
    path('', include('backend.listing.urls')),
    # include('backend.address.urls'),
]
