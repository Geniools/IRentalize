from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from backend.users.manager import UserManager
from backend.users.utils import is_valid_number


class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=80, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True, validators=[is_valid_number])
    
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # last_login = models.DateTimeField(auto_now=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']
    
    objects = UserManager()
    
    class Meta:
        db_table = 'user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.username if self.username else self.email
    
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
    
    def get_short_name(self):
        return f"{self.first_name[0]} {self.last_name}"
    
    def has_perm(self, perm, obj=None):
        return super().has_perm(perm, obj)
