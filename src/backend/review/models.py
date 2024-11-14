from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Review(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listing.Listing', on_delete=models.CASCADE)
    reviewer = models.ForeignKey('user.User', on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=50)
    content = models.TextField(null=True, blank=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'review'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.reviewer} - {self.listing}'
