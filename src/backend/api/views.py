from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.permissions import IsListingOwner, IsListingImageOwner, IsAvailabilityOwner, IsNotListingReservationOwner, IsListingReservationOwner
from backend.api.serializers import *
from backend.api.utils import is_valid_captcha
from backend.bookings.models import Reservation, Availability
from backend.bookings.serializers import ReservationSerializer, AvailabilitySerializer, ReservationStatusSerializer
from backend.listings.filters import ListingSearchFilter
from backend.listings.models import Category, Listing, ListingImage
from backend.listings.serializers import CategorySerializer, ListingSerializer, ListingImageSerializer
from backend.users.models import UserProfile
from backend.users.serializers import UserProfileImageSerializer


# Categories
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


# Listings
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Listing.objects.filter(visible=True)
    serializer_class = ListingSerializer
    filterset_class = ListingSearchFilter


# API ENDPOINTS FOR THE LOGGED-IN USER in the DASHBOARD =======================================

# User listings (api endpoint to be used only when interacting with the listings attributed to the logged-in user)
class UserListingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsListingOwner]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = ListingSearchFilter
    pagination_class = None
    
    def create(self, request, *args, **kwargs):
        # Make a "copy" of the request data so that we can modify it (QueryDict is immutable)
        copy_data = request.data
        # Add the user (host) to the created listing
        copy_data['host'] = request.user.id
        # Create the serializer
        serializer = ListingSerializer(data=copy_data)
        # Validate the data
        if serializer.is_valid():
            # Save the listing
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        return Listing.objects.filter(host=self.request.user)


# Listing images (api endpoint to be used only when interacting with the images attributed to the logged-in user)
class UserListingImageViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = ListingImage.objects.all()
    permission_classes = [IsAuthenticated, IsListingImageOwner]
    serializer_class = ListingImageSerializer
    pagination_class = None
    
    def get_queryset(self):
        # First retrieve all the listings attributed to the logged-in user
        listings = Listing.objects.filter(host=self.request.user)
        # Then retrieve all the images attributed to the listings
        return ListingImage.objects.filter(listing__in=listings)


# API endpoint to update and delete the user profile image
class UserProfileImageUpdateAPI(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    pagination_class = None
    
    def get_object(self):
        return self.request.user.profile
    
    def delete(self, request, *args, **kwargs):
        # Get the user profile
        profile = self.get_object()
        # Delete the profile image
        profile.profile_picture.delete()
        # Return a response
        return Response(status=status.HTTP_204_NO_CONTENT)


# API endpoint to create, update and delete the Availability model of a Listing
class UserAvailabilityViewSet(viewsets.ModelViewSet):
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


# API endpoint to update and retrieve the Reservation model of a Listing
class UserReservationUpdateAPI(generics.ListAPIView):
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


# API endpoint to update the status of a Reservation
class UserReservationStatusUpdateAPI(generics.UpdateAPIView):
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


# API endpoint to view the orders done by the logged-in user
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


# API ENDPOINTS FOR ALL USERS in the DASHBOARD (FINISH) ================================================

# View to handle Reservation requests
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


# Contact Us Form
class ContactUsView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = ContactUsFormSerializer(data=request.data)
        if serializer.is_valid():
            # Save the form contents
            full_name = serializer.validated_data['full_name']
            email = serializer.validated_data['email']
            phone = serializer.validated_data['phone_number']
            message = serializer.validated_data['message']
            terms_and_conditions = serializer.validated_data['terms_and_conditions']
            
            # Check if the user agreed to the terms and conditions
            if not terms_and_conditions:
                return Response({'message': 'You must agree to the terms and conditions'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            
            # Validate the captcha
            captcha = serializer.validated_data['g_recaptcha_response']
            
            if not is_valid_captcha(request=request, captcha=captcha):
                return Response({'message': 'Invalid captcha'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            
            # Send email if captcha is valid
            subject = f'New Contact Us Form - {full_name}'
            email_message = f'Full Name: {full_name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}'
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, email_message, from_email, [settings.DEFAULT_FROM_EMAIL])
            
            return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
