import requests
from django.conf import settings
from django.core.mail import send_mail
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.serializers import *
from backend.listings.filters import ListingSearchFilter
from .utils import get_client_ip


# Listings
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ListingSearchFilter


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
                    'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                    'response': captcha,
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
