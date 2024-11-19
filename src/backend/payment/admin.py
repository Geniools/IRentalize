from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from backend.payment.models import Payment


@admin.register(Payment)
class PaymentAdmin(UnfoldModelAdmin):
    list_display = ('id', 'user', 'reservation', 'is_paid')
    list_filter = ('is_paid',)
    search_fields = ('user__first_name', 'user__last_name', 'reservation__id')
    ordering = ('-id',)
    readonly_fields = ('id', 'user', 'reservation')
    fieldsets = (
        (None, {
            'fields': ('id', 'user', 'reservation', 'is_paid')
        }),
    )
    add_fieldsets = (
        (None, {
            'fields': ('user', 'reservation', 'is_paid')
        }),
    )
    filter_horizontal = ()
    actions = ('mark_as_paid',)

    def mark_as_paid(self, request, queryset):
        queryset.update(is_paid=True)
        self.message_user(request, 'The selected payments have been marked as paid.')

    mark_as_paid.short_description = 'Mark selected payments as paid'
