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
            
            # Send email
            subject = f'New Contact Us Form - {full_name}'
            email_message = f'Full Name: {full_name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}'
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, email_message, from_email, ['gumaniuc.alexandru@gmail.com'])
            
            return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
