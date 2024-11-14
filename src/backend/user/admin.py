from django import forms
from django.contrib import admin
from django.contrib.auth import password_validation
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError

from backend.user.models import User, UserProfile


class UserCreationForm(forms.ModelForm):
    """
    A form for creating new user. Includes all the required
    fields, plus a repeated password.
    """

    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="Password confirmation", widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")

        return password2

    def _post_clean(self):
        super()._post_clean()
        # Validate the password after self.instance is updated with form data
        # by super().
        password = self.cleaned_data.get("password2")
        if password:
            try:
                password_validation.validate_password(password, self.instance)
            except ValidationError as error:
                self.add_error("password2", error)

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
            
        return user


class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'email', 'first_name', 'last_name',
            'is_active', 'is_staff', 'is_superuser', 'user_permissions'
        ]


class UserProfileInLine(admin.StackedInline):
    model = UserProfile
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


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser']
    list_display_links = ['id', 'email']
    readonly_fields = ['id', 'last_login', 'date_joined']
    empty_value_display = '-'
    ordering = ['-date_joined']
    inlines = (UserProfileInLine,)

    # The form to add a new user
    add_form = UserCreationForm
    # Fieldsets that will be shown when ADDING a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields':  ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )

    # The form to change user instances
    form = UserChangeForm
    # Fieldsets that will be shown when VIEWING/CHANGING a user
    fieldsets = (
        ('User', {
            'fields': (
                'id', 'email', 'first_name', 'last_name', 'last_login', 'date_joined',
            ),
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser',
            ),
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'username', 'phone']
    list_display_links = ['id', 'user']
    readonly_fields = ['id', 'user']
    empty_value_display = '-'

    fieldsets = (
        ('User Profile', {
            'fields': (
                'user', 'username', 'phone', 'profile_picture',
            ),
        }),
        ('Default Address', {
            'fields': (
                'default_address',
            ),
        }),
    )


admin.site.unregister(Group)
