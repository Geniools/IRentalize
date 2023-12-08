from rest_framework import permissions


class IsListingOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.host == request.user


class IsAvailabilityOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.listing.host == request.user


class IsListingImageOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.listing.host == request.user


class IsNotListingReservationOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.listing.host != request.user)


class IsListingReservationOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.listing.host == request.user)
