from rest_framework import mixins, viewsets

from backend.main.models import ContactUs
from backend.main.serializers import InputContactUsSerializer


class ContactUsViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = InputContactUsSerializer
    permission_classes = []
