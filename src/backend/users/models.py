from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from backend.listings.models import Address
from backend.users.manager import UserManager
from backend.users.utils import is_valid_number


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    # User details
    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=80, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # Access control
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # Timestamps
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
        return f'{self.first_name} {self.last_name}'
    
    def get_short_name(self):
        return f"{self.first_name[0]} {self.last_name}"
    
    def has_perm(self, perm, obj=None):
        return super().has_perm(perm, obj)


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    # User profile details
    about_me = models.TextField(null=True, blank=True, help_text='Tell us something about yourself. This will be shown on your profile page.')
    profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    default_address = models.OneToOneField(
        'listings.Address', on_delete=models.SET_NULL, related_name='default_address', null=True, blank=True,
        help_text='This will be used as your default address when creating a listing.'
    )
    phone = models.CharField(
        max_length=15, null=True, blank=True, validators=[is_valid_number],
        help_text='An non Dutch phone number must contain the country code with the "+" sign.'
    )
    # Response (auto-calculated)
    response_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0, help_text='This is the percentage of messages replied to within 24 hours.')
    response_time = models.DurationField(null=True, blank=True, help_text='This is the average time taken to reply to a message.')
    
    class Meta:
        db_table = 'user_profile'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
        ordering = ['user__date_joined']
    
    def __str__(self):
        return self.user.get_full_name()
