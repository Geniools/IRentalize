from django_filters import rest_framework as filters

from backend.listings.models import Listing


class ListingSearchFilter(filters.FilterSet):
    category = filters.CharFilter(field_name='category__name', lookup_expr='icontains')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    
    class Meta:
        model = Listing
        # https://docs.djangoproject.com/en/4.2/topics/db/queries/#field-lookups
        fields = {
            # 'title': ['icontains'],
            'description': ['icontains'],
            'address': ['icontains'],
            'price': []
        }
