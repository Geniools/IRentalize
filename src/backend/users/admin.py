from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from backend.users.models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    readonly_fields = ['id', 'last_login', 'date_joined']
    
    # Fieldsets that will be shown when ADDING a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    
    # Fieldsets that will be shown when VIEWING/CHANGING a user
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
