from django.contrib import admin

from backend.student_finance.models import StudentFinanceRequest


@admin.register(StudentFinanceRequest)
class RequestAdmin(admin.ModelAdmin):
    list_display = ('get_short_full_name', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('first_name', 'last_name', 'email', 'message')
    date_hierarchy = 'created_at'
    list_display_links = ('get_short_full_name', 'email')
    readonly_fields = ('created_at',)
    
    @admin.display(description='Name')
    def get_short_full_name(self, obj):
        return obj.get_short_full_name()
