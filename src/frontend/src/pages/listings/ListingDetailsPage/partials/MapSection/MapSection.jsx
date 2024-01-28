import React from "react";

import HeadSubTitle from "../../../../../components/ui/HeadSubTitle/HeadSubTitle";
import GoogleMapContainer from "../../../../../components/GoogleMapContainer/GoogleMapContainer";

import styles from "./MapSection.module.css";

const MapSection = ({address}) => {
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

export default MapSection;