from django.db import models

from backend.user.utils import is_valid_number


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ContactUs(BaseModel):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=250, null=True, blank=True)
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True, blank=True)
    email = models.EmailField()
    message = models.TextField()
    phone = models.CharField(
        max_length=15, validators=[is_valid_number],
        help_text='An non Dutch phone number must contain the country code with the "+" sign.',
        null=True, blank=True,
    )

    class Meta:
        db_table = 'contact_us'
        verbose_name = 'Contact Us'
        verbose_name_plural = 'Contact Us'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email}"
