from django.contrib import admin
from backend.listings.models import Listing, ListingImage, Category


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    pass


@admin.register(ListingImage)
class ListingImageAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
