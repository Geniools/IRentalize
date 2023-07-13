from django_filters import rest_framework as filters
from rest_framework import viewsets

from backend.api.serializers import *
from backend.listings.filters import ListingSearchFilter


# Listings
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ListingSearchFilter
