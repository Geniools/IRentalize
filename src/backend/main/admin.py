from django.contrib import admin

from backend.main.models import ContactUs

# Custom admin site settings
admin.site.site_header = 'IRentalize Admin'
admin.site.site_title = 'IRentalize Admin Portal'
admin.site.index_title = 'Welcome to IRentalize Portal'


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('email', 'message')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at')
    fieldsets = (
        (None, {
            'fields': (
                'id', 'first_name', 'middle_name', 'last_name',
                'email', 'message', 'phone',
                'created_at'
            )
        }),
    )
    add_fieldsets = (
        (None, {
            'fields': ('email', 'message')
        }),
    )

    actions = None
    save_on_top = True
    save_as = True
    show_full_result_count = True
    show_change_link = True
