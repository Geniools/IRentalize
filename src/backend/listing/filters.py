from django_filters import rest_framework as filters

from backend.listing.models import Listing


class ListingFilter(filters.FilterSet):
    # TODO: Enhance filtering
    category = filters.CharFilter(field_name='category__pk', lookup_expr='icontains')
    category_name = filters.CharFilter(field_name='category__name', lookup_expr='iexact')

    class Meta:
        model = Listing
        fields = {}
