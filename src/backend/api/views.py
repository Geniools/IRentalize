import requests
from django.conf import settings
from django.core.mail import send_mail
from django_filters import rest_framework as filters
from rest_framework import mixins
from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.serializers import *
from backend.listings.filters import ListingSearchFilter
from .permissions import IsListingOwner, IsListingImageOwner
from .utils import get_client_ip


# Categories
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


# Listing images
class ListingImageViewSet(mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = ListingImage.objects.all()
    permission_classes = [IsAuthenticated, IsListingImageOwner]
    serializer_class = ListingImageSerializer
    pagination_class = None
    
    def get_queryset(self):
        # First retrieve all the listings attributed to the logged-in user
        listings = Listing.objects.filter(host=self.request.user)
        # Then retrieve all the images attributed to the listings
        return ListingImage.objects.filter(listing__in=listings)


# Listings
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = ListingSearchFilter


# User listings (api endpoint to retrieve only the listings attributed to the logged-in user)
class UserListingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsListingOwner]
    serializer_class = ListingSerializer
    queryset = Listing.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
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
            captcha_response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'response': captcha,
                    'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                    'remote_ip': get_client_ip(request),
                }
            )
            
            if not captcha_response.json()['success']:
                return Response({'message': 'Invalid captcha'}, status=status.HTTP_406_NOT_ACCEPTABLE)
            
            # Send email if captcha is valid
            subject = f'New Contact Us Form - {full_name}'
            email_message = f'Full Name: {full_name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}'
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, email_message, from_email, ['gumaniuc.alexandru@gmail.com'])
            
            return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
