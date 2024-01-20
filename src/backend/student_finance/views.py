from rest_framework import mixins, status, viewsets, serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from backend.api.utils import is_valid_captcha
from backend.student_finance.serializers import StudentFinanceRequestSerializer


class RequestCreateAPIView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = StudentFinanceRequestSerializer
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'request'
    
    def create(self, request, *args, **kwargs):
        try:
            # Validate the request data
            self.clean(request)
            # Remove the "terms_and_conditions" and captcha field from the request data
            request.data.pop('terms_and_conditions')
            request.data.pop('g_recaptcha_response')
        except serializers.ValidationError as e:
            return Response(
                e.detail,
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Validate the serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Save the request
        request = serializer.save()
        # Send the email
        # send_request_email(request)
        return Response(
            {'detail': 'Request sent successfully.'},
            status=status.HTTP_201_CREATED,
        )
    
    def clean(self, request):
        """
        Validate the request data. Raise a ValidationError if the data is invalid.
        
        :param request: The request object
        :type request: rest_framework.request.Request
        :return: None
        :raise serializers.ValidationError: If one of the validations fails
        """
        
        # Validate the captcha - should be the first validation
        try:
            # Validate the captcha
            if not is_valid_captcha(request, request.data['g_recaptcha_response']):
                raise serializers.ValidationError(
                    {'g_recaptcha_response': 'Invalid captcha'},
                )
        except KeyError:
            raise serializers.ValidationError(
                {'g_recaptcha_response': 'You must provide a captcha'},
            )
        
        # Check if the "terms_and_conditions" field is checked
        if not request.data.get('terms_and_conditions'):
            raise serializers.ValidationError(
                {'terms_and_conditions': 'You must accept the terms and conditions'},
            )
