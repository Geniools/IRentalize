from django.contrib import admin

from backend.users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
