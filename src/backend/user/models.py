from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django_cleanup import cleanup

from backend.listing.utils import is_valid_image
from backend.main.utils import UploadToPathAndRename
from backend.user.manager import UserManager
from backend.user.utils import is_valid_number


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    # User details
    first_name = models.CharField(max_length=250)
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250)
    email = models.EmailField(max_length=255, unique=True)
    # Access control
    is_superuser = models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.')
    is_staff = models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.')
    is_active = models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.')
    # Timestamps
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']
    # Manager (custom)
    objects = UserManager()

    class Meta:
        db_table = 'user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']

    def __str__(self):
        return self.get_full_name()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Create an empty profile for the user
        if not hasattr(self, 'profile'):
            UserProfile.objects.create(user=self)

    def get_full_name(self):
        return f'{self.first_name} {self.middle_name if self.middle_name else ""} {self.last_name}'

    def get_short_name(self):
        return f"{self.first_name[0]} {self.last_name}"

    def has_perm(self, perm, obj=None):
        return super().has_perm(perm, obj)


@cleanup.select
class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    default_address = models.ForeignKey(
        'address.Address',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='user',
    )

    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    profile_picture = models.ImageField(
        upload_to=UploadToPathAndRename('profile_pictures', 'user.first_name'),
        validators=[is_valid_image],
        null=True, blank=True
    )

    phone = models.CharField(
        max_length=15, validators=[is_valid_number],
        help_text='An non Dutch phone number must contain the country code with the "+" sign.',
        null=True, blank=True,
    )

    class Meta:
        db_table = 'user_profile'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
        ordering = ['user__date_joined']

    def __str__(self):
        return self.user.get_full_name()
