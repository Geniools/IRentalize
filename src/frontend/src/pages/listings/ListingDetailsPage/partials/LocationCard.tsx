import {ReactNode, useEffect, useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

import {Loader2, MapPin} from 'lucide-react'

import L from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import './leafletCustom.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: '/static/leaflet/marker-icon.png',
    iconRetinaUrl: '/static/leaflet/marker-icon-2x.png',
    shadowUrl: '/static/leaflet/marker-shadow.png',
});

interface Coordinates {
    lat: number;
    lng: number;
}

// Geocoding Service
const geocodeAddress = async (address: Address): Promise<Coordinates> => {
    try {
        const query = encodeURIComponent(
            `${address.street_name} ${address.number}, ${address.location?.city}, ${address.location?.country}`
        )
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        )

        if (!response.ok) {
            throw new Error('Geocoding service failed')
        }

        const data = await response.json()
        if (data.length === 0) {
            throw new Error('Location not found')
        }

        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Failed to geocode address. ' + error.message)
        }

        throw new Error('Failed to geocode address')
    }
}

// Map Component
interface MapViewProps {
    coordinates: Coordinates;
    address: Address;
}

const MapView: React.FC<MapViewProps> = ({coordinates, address}) => (
    <div id="map" className="h-96 rounded-lg overflow-hidden">
        <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={15}
            className="h-full w-full"
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                    {address.street_name} {address.number}
                    <br/>
                    {address.location?.city}, {address.location?.country}
                </Popup>
            </Marker>
        </MapContainer>
    </div>
);

function Alert(props: { variant: string, children: ReactNode }) {
    return null;
}

function AlertDescription(props: { children: React.ReactNode }) {
    return null;
}

// Enhanced Location Card Component
const LocationCard: React.FC<{ address?: Address }> = ({address}) => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!address) {
        return null;
    }

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Gecode the address only if longitude and latitude are not provided
                if (address?.latitude && address?.longitude) {
                    setCoordinates({
                        lat: address.latitude,
                        lng: address.longitude
                    });

                    return;
                }

                const coords = await geocodeAddress(address);
                setCoordinates(coords);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load map');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoordinates();
    }, [address]);

    return (
        <Card className="bg-background/10 backdrop-blur-lg border-muted">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <MapPin className="text-primary h-5 w-5"/>
                    <CardTitle className="text-white">Location</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="text-gray-300 space-y-2">
                    <p>{address.street_name} {address.number}</p>
                    <p>{address.zip_code}</p>
                    <p>{address.location?.city}, {address.location?.country}</p>
                </div>

                {isLoading && (
                    <div
                        className="h-64 rounded-lg border border-muted flex items-center justify-center bg-background/5">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                            <span className="text-sm text-gray-400">Loading map...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                {coordinates && !isLoading && !error && (
                    <MapView coordinates={coordinates} address={address}/>
                )}
            </CardContent>
        </Card>
    );
}

export default LocationCard