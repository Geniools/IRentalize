from rest_framework import routers

from backend.main.views import ContactUsViewSet

router = routers.DefaultRouter()
router.register(r'contact-us', ContactUsViewSet, basename='contact-us')

urlpatterns = [
]

urlpatterns += router.urls
