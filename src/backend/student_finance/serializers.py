from rest_framework import serializers

from backend.student_finance.models import StudentFinanceRequest


class StudentFinanceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentFinanceRequest
        fields = [
            'first_name', 'last_name', 'email', 'message',
        ]
        extra_kwargs = {
            'message': {'required': False},
        }
