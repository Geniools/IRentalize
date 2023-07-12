from django.contrib.auth import login
from django_filters import rest_framework as filters
from knox.views import LoginView as KnoxLoginView
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny

from backend.api.serializers import *
from backend.listings.filters import ListingSearchFilter


# Listings
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ListingSearchFilter


# Login, logout, and registration
class LoginView(KnoxLoginView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super().post(request, format=None)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
