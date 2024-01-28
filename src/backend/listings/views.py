from rest_framework import viewsets, status, mixins
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from backend.api.pagination import CustomPageNumberPagination
from backend.api.permissions import IsListingOwner, IsListingImageOwner
from backend.listings.filters import ListingSearchFilter
from backend.listings.models import Category, Listing, ListingImage
from backend.listings.serializers import CategorySerializer, ListingSerializer, ListingImageSerializer


# API to retrieve all the Categories
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


# API to retrieve all the Listings
class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    # Retrieve the listings that are visible to the public, from the oldest to the newest
    queryset = Listing.objects.filter(visible=True).order_by('created_at')
    serializer_class = ListingSerializer
    filterset_class = ListingSearchFilter
    pagination_class = CustomPageNumberPagination


# User listings (api endpoint to be used only when interacting with the listings attributed to the logged-in user)
class UserListingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsListingOwner]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = [MultiPartParser, FormParser]
    filterset_class = ListingSearchFilter
    # TODO: Add pagination
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
