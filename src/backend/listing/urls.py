from rest_framework import routers

from backend.listing.views import OutputListingViewSet

router = routers.DefaultRouter()
router.register(r'listings', OutputListingViewSet, basename='listing')

urlpatterns = [
]

urlpatterns += router.urls
