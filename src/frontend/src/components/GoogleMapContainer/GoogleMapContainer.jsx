import React from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

import Loader from "../ui/Loader/Loader";

import styles from "./GoogleMapContainer.module.css";

export default function GoogleMapContainer({latitude, longitude, zoom = 18}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const center = {
        lat: +latitude,
        lng: +longitude,
    };

    return (
        <div>
            {!isLoaded ? (
                <div className={"flex-horizontally-center flex-vertically-centered space-filler"}>
                    <Loader/>
                </div>
            ) : (
                <GoogleMap
                    mapContainerClassName={styles.mapContainer}
                    center={center}
                    zoom={zoom}
                >
                    <Marker position={center}/>
                </GoogleMap>
            )}
        </div>
    );
}