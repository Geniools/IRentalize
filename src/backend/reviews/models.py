from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Review(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE)
    guest = models.ForeignKey('users.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    comment = models.TextField()
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'review'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.guest} - {self.listing}'
