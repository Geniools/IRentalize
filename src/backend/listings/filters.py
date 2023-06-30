from django_filters import rest_framework as filters

from backend.listings.models import Listing


class ListingSearchFilter(filters.FilterSet):
    class Meta:
        model = Listing
        fields = ['category', 'category__name', 'title', 'description', 'price']
