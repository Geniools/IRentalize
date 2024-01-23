from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.api.utils import is_valid_captcha
from backend.main.serializers import ContactUsFormSerializer


# Contact Us Form
# TODO: Change this form to be similar to the form in the "student_finance" app
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
