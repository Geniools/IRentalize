from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from backend.review.models import Review


@admin.register(Review)
class ReviewAdmin(UnfoldModelAdmin):
    list_display = ('id', 'listing', 'reviewer', 'title', 'rating', 'created_at')
    list_filter = ('listing', 'reviewer', 'rating')
    search_fields = ('title', 'content', 'listing__title', 'reviewer__email')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('id', 'listing', 'reviewer', 'title', 'content', 'rating')
        }),
        ('Timestamps', {
            'fields':  ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
