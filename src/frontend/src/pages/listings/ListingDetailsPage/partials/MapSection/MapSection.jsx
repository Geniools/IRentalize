import React from "react"

import HeadSubTitle from "../../../../../components/HeadSubTitle.tsx"
import GoogleMapContainer from "../../../../../components/GoogleMapContainer/GoogleMapContainer"
import Loader from "../../../../../components/Loader/Loader.js"

import styles from "./MapSection.module.css"

const MapSection = ({address}) => {
    // If the listing has no address, don't display the map
    if (!address) {
        return (
            <div className={"flex-container flex-horizontally-center flex-vertically-centered"}>
                <Loader/>
            </div>
        )
    }

    return (
        <>
            <HeadSubTitle title="Location"/>

            <div className={styles.mapAddressInfo}>
                <p><b>Zip Code: </b>{address?.zip_code}</p>
                <p><b>Street: </b>{address?.street_name} {address?.house_number} {address?.house_addition}</p>
            </div>

            <GoogleMapContainer latitude={address?.latitude} longitude={address?.longitude}/>
        </>
    )
}

export default MapSection