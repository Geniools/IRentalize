"""
Pending:
The reservation has been received but not yet confirmed. This status is typically assigned when a customer initiates
the reservation process.

Confirmed:
The reservation has been successfully confirmed, and the product or service is reserved for the customer.

Cancelled:
The customer or the system has canceled the reservation. This could be due to customer request, unavailability of the
product or service, or other reasons.

Completed:
The reservation has been successfully fulfilled, and the product or service has been provided to the customer.

No Show:
If your business involves appointments or reservations where customers need to be physically present, you might want
to have a status for customers who didn't show up.

Payment Pending:
The reservation is confirmed, but the customer has not yet made the required payment. This status is particularly
relevant if you have a payment process associated with reservations.

Refunded:
The customer requested and received a refund for the reservation.

On Hold:
There's a temporary hold on the reservation for various reasons, such as pending verification or awaiting further
information.
"""

RESERVATION_STATUS = (
    (0, 'Pending'),
    (1, 'Confirmed'),
    (2, 'Cancelled'),
    (3, 'Completed'),
    (4, 'No Show'),
    (5, 'Payment Pending'),
    (6, 'Refunded'),
    (7, 'On Hold'),
)
