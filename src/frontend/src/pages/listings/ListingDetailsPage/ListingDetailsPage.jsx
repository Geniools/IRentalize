import React from "react";
import {useNavigate, useParams} from "react-router-dom";

import useListingData from "../../../hooks/useListingData";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/ui/Loader/Loader";
import HeadTitle from "../../../components/ui/HeadTitle/HeadTitle";
import HeadSubTitle from "../../../components/ui/HeadSubTitle/HeadSubTitle";

import ImageGallery from "./partials/ImageGalery/ImageGallery";
import Description from "./partials/Description/Description";
import HostInfo from "./partials/HostInfo/HostInfo";
import MapSection from "./partials/MapSection/MapSection";
import BookingSection from "./partials/BookingSection/BookingSection";

import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
    const navigator = useNavigate();
    const {id} = useParams();

    const {
        data: listing,
        isLoading,
        isError,
    } = useListingData(id);

    if (isError) return (navigator("/404/"))

    if (isLoading) return (
        <>
            <Header/>
            <div className={"page-container flex-vertically-centered flex-horizontally-center space-filler"}>
                <Loader/>
            </div>
            <Footer/>
        </>
    );

    return (
        <>
            <Header/>

            <div className="page-container">
                {/* Title and address */}
                <div className={styles.section}>
                    <HeadTitle title={listing.title} capitalize={true}/>
                    <HeadSubTitle title={listing.category_name}/>
                </div>

                <hr/>

                {/* Image gallery */}
                <div className={styles.section}>
                    <ImageGallery images={listing.images} listingId={listing.id}/>
                </div>

                <hr/>

                {/* Description */}
                <div className={styles.section}>
                    <Description description={listing.description} createdAt={listing.created_at} updatedAt={listing.updated_at}/>
                </div>

                <hr/>

                {/* Host */}
                <div className={styles.section}>
                    <HostInfo
                        hostFirstName={listing.host_first_name}
                        hostUsername={listing.host_username}
                        hostProfilePicture={listing.host_profile_picture}
                        hostAboutMe={listing.host_about_me}
                        hostMemberSince={listing.host_member_since}
                        hostResponseTime={listing.host_response_time}
                    />
                </div>

                <hr/>

                {/* Map */}
                {
                    // If the listing has no address, don't display the map
                    listing.address && (
                        <div className={styles.section}>
                            <MapSection address={listing.address}/>
                        </div>
                    ) || <Loader/>
                }

                <hr/>

                {/* Book now and Calendar with availability */}
                <div id="booking-section" className={styles.section}>
                    <BookingSection
                        availabilities={listing.availabilities}
                        unavailableDates={listing.unavailable_dates}
                        price={listing.price}
                        host={listing.host}
                        listingId={listing.id}
                    />
                </div>

                {/* Reviews */}
                {/*<div className={styles.section}>*/}
                {/*    <h1>Reviews</h1>*/}
                {/*</div>*/}
            </div>

            <Footer/>
        </>
    );
}

export default ListingDetailsPage;