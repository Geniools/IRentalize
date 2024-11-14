from django.contrib import admin

from backend.address.models import Location, Address


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'city', 'country')
    list_display_links = ('id', 'city', 'country')
    search_fields = ('city', 'country')
    fieldsets = [
        ('Location', {
            'fields': [
                'city', 'country',
            ],
        }),
    ]


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'street_name', 'number', 'number_addition', 'zip_code', 'province', 'name')
    list_display_links = ('id', 'location', 'street_name', 'number', 'number_addition', 'zip_code', 'province', 'name')
    search_fields = ('location', 'street_name', 'number', 'number_addition', 'zip_code', 'province', 'name', 'latitude', 'longitude')
    fieldsets = [
        ('Address', {
            'fields': [
                'location', 'street_name', 'number', 'number_addition', 'zip_code', 'province', 'name',
            ],
        }),
        ('Location coordinates', {
            'fields': [
                'latitude', 'longitude',
            ],
        }),
    ]
