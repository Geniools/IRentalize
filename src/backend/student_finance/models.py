from django.db import models


# Model used to represent a request from the contact form
class StudentFinanceRequest(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    message = models.TextField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Student Finance Request'
        verbose_name_plural = 'Student Finance Requests'
        # Database router
        db_table = 'student_finance_request'
    
    def __str__(self):
        return self.get_short_full_name() + " - " + self.email
    
    def get_short_full_name(self):
        return f"{self.first_name[0]}. {self.last_name}"
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
