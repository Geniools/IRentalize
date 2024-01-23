from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Grappelli admin interface
    path('grappelli/', include('grappelli.urls')),
    # Authentication endpoints (custom)
    path('auth/', include('backend.auth.urls')),
    # All the API endpoints are handled by the backend.api app
    path('api/', include('backend.api.urls')),
    # All the frontend is handled by the frontend app
    path('', include('frontend.urls')),
]

handler404 = 'frontend.views.handler404'

# In order to serve media files in development, we need to add the following to the project's urls.py file:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
