from unfold.admin import StackedInline as UnfoldStackedInline

from backend.user.models import UserProfile


class UserProfileInLine(UnfoldStackedInline):
    model = UserProfile
    hide_title = True
    can_delete = False
    verbose_name_plural = 'Profile'
    readonly_fields = ['id', ]
    empty_value_display = '-'

    fieldsets = (
        ('User Profile', {
            'fields': (
                'username', 'phone', 'profile_picture'
            ),
        }),
        ('Default Address', {
            'fields': (
                'default_address',
            ),
        }),
    )
