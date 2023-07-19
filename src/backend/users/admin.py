from django.contrib import admin

from backend.users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ['id', 'last_login', 'date_joined']
    fieldsets = (
        ('User', {
            'fields': (
                'id', 'username', 'email', 'first_name', 'last_name', 'address', 'phone', 'last_login', 'date_joined',
            ),
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',
            ),
        }),
    )
