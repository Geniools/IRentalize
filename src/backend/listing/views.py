from rest_framework import viewsets

from backend.api.pagination import CustomPageNumberPagination
from backend.listing.filters import ListingFilter
from backend.listing.models import Listing
from backend.listing.serializers import OutputListingSerializer


class OutputListingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Listing.objects.prefetch_related('images', 'category', 'address').all()
    serializer_class = OutputListingSerializer
    permission_classes = []
    filter_class = ListingFilter
    pagination_class = CustomPageNumberPagination
