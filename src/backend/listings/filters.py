from django_filters import rest_framework as filters

from backend.listings.models import Listing


class ListingSearchFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    category = filters.CharFilter(field_name='category__pk', lookup_expr='icontains')
    category_name = filters.CharFilter(field_name='category__name', lookup_expr='iexact')
    
    class Meta:
        model = Listing
        # https://docs.djangoproject.com/en/4.2/topics/db/queries/#field-lookups
        fields = {
            # 'title': ['icontains'],
            'description': ['icontains'],
            'address': ['icontains'],
            'price': []
        }
