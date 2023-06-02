from django.contrib import admin

from backend.reviews.models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    pass
