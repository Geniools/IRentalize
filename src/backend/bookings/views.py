from rest_framework import viewsets, generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.api.permissions import IsAvailabilityOwner, IsNotListingReservationOwner, IsListingReservationOwner
from backend.bookings.models import Availability, Reservation
from backend.bookings.serializers import AvailabilitySerializer, ReservationSerializer, ReservationStatusSerializer
from backend.listings.models import Listing


# API endpoint to create, update and delete the Availability model of a Listing (in the dashboard)
class UserListingAvailabilityViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAvailabilityOwner]
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer
    pagination_class = None
    filterset_fields = ['listing']
    
    def get_queryset(self):
        # First retrieve all the listings attributed to the logged-in user
        listings = Listing.objects.filter(host=self.request.user)
        # Then retrieve all the availabilities attributed to the listings
        return Availability.objects.filter(listing__in=listings)


# API endpoint to retrieve the Reservations of a Listing (in the dashboard)
class UserListingReservationAPI(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsNotListingReservationOwner]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    pagination_class = None
    filterset_fields = ['listing']
    
    def get_queryset(self):
        # First retrieve all the listings attributed to the logged-in user
        listings = Listing.objects.filter(host=self.request.user)
        # Then retrieve all the reservations attributed to the listings
        return Reservation.objects.filter(listing__in=listings)


# API endpoint to update the status of a Reservation (in the dashboard)
class UserListingReservationStatusUpdateAPI(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, IsListingReservationOwner]
    queryset = Reservation.objects.all()
    serializer_class = ReservationStatusSerializer
    pagination_class = None
    
    def update(self, request, *args, **kwargs):
        # Get the reservation
        reservation = self.get_object()
        try:
            # Get the status
            reservation_status = request.data['status']
            # Update the status
            reservation.status = reservation_status
            # Validate the status
            reservation.clean_fields()
            reservation.save()
        except ValueError:
            return Response({'message': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response({'message': e}, status=status.HTTP_400_BAD_REQUEST)
        
        # Return a response
        return Response(status=status.HTTP_204_NO_CONTENT)


# API endpoint to view the orders done by the logged-in user (in the dashboard)
class UserOrdersViewAPI(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    pagination_class = None
    
    def get_queryset(self):
        # Get the user
        user = self.request.user
        # Get the user's reservations
        return Reservation.objects.filter(guest=user)


# View to create a reservation for a listing
class ReservationCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, IsNotListingReservationOwner]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    pagination_class = None
    
    def get_queryset(self):
        # Get the user
        user = self.request.user
        # Get the user's reservations
        return Reservation.objects.filter(guest=user)
    
    def create(self, request, *args, **kwargs):
        # Make a "copy" of the request data so that we can modify it (QueryDict is immutable)
        copy_data = request.data
        # Add the user (guest) to the created reservation
        copy_data['guest'] = request.user.id
        # Create the serializer
        serializer = ReservationSerializer(data=copy_data)
        # Validate the data
        if serializer.is_valid():
            # Save the reservation
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
