from rest_framework import permissions


class IsListingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'POST':
            return True
        
        return obj.host == request.user


class IsListingImageOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.listing.host == request.user
