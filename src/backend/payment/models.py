from django.db import models


# ! This model will most likely be modified when the payment gateway is implemented
class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    # The user who made the payment
    user = models.ForeignKey('user.User', on_delete=models.DO_NOTHING, related_name='payments')
    # The reservation that the payment is for
    reservation = models.OneToOneField('booking.Reservation', on_delete=models.DO_NOTHING, related_name='payment')
    is_paid = models.BooleanField(default=False)

    class Meta:
        db_table = 'payment'
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        ordering = ['-id']

    def __str__(self):
        return self.user.get_full_name()
