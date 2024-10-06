import React from "react"
import {useNavigate, useParams} from "react-router-dom"

import useListingData from "../../../hooks/useListingData.js"
import useCreateChatRoom from "../../../hooks/useCreateChatRoom.js"

import Header from "../../../components/Header.tsx"
import Footer from "../../../components/Footer/Footer"
import Loader from "../../../components/Loader/Loader.js"
import HeadTitle from "../../../components/HeadTitle.tsx"
import HeadSubTitle from "../../../components/HeadSubTitle.tsx"

import ImageGallerySection from "./partials/ImageGalerySection/ImageGallerySection"
import DescriptionSection from "./partials/Description/DescriptionSection"
import HostInfoSection from "./partials/HostInfoSection/HostInfoSection"
import MapSection from "./partials/MapSection/MapSection"
import BookingSection from "./partials/BookingSection/BookingSection"
import BookingDisabledSection from "./partials/BookingDisabledSection/BookingDisabledSection"

import styles from "./ListingDetailsPage.module.css"

const ListingDetailsPage = () => {
    const navigator = useNavigate()
    const {id} = useParams()

    const {
        data: listing,
        isLoading,
        isError,
    } = useListingData(id)

    const chatRoom = useCreateChatRoom({listingId: id})

    if (isError) return (navigator("/404/"))

    if (isLoading) return (
        <>
            <Header/>
            <div className={"page-container flex-vertically-centered flex-horizontally-center space-filler"}>
                <Loader/>
            </div>
            <Footer/>
        </>
    )

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
                    <ImageGallerySection
                        images={listing.images}
                        listingId={listing.id}
                    />
                </div>

                <hr/>

                {/* Description */}
                <div className={styles.section}>
                    <DescriptionSection
                        description={listing.description}
                        createdAt={listing.created_at}
                        updatedAt={listing.updated_at}
                    />
                </div>

                <hr/>

                {/* Host */}
                <div className={styles.section}>
                    <HostInfoSection
                        hostFirstName={listing.host_first_name}
                        hostUsername={listing.host_username}
                        hostProfilePicture={listing.host_profile_picture}
                        hostAboutMe={listing.host_about_me}
                        hostMemberSince={listing.host_member_since}
                        hostResponseTime={listing.host_response_time}
                        chatRoom={chatRoom}
                    />
                </div>

                <hr/>

                {/* Map */}
                <div className={styles.section}>
                    <MapSection address={listing.address}/>
                </div>

                <hr/>

                {/* Book now and Calendar with availability */}
                <div className={styles.section}>
                    {
                        !listing.enable_booking ? (
                            <BookingDisabledSection
                                hostEmail={listing.host_email_address}
                                chatRoom={chatRoom}
                            />
                        ) : (
                            <BookingSection
                                availabilities={listing.availabilities}
                                unavailableDates={listing.unavailable_dates}
                                price={listing.price}
                                host={listing.host}
                                listingId={listing.id}
                            />
                        )
                    }
                </div>

                {/* Reviews */}
                {/*<div className={styles.section}>*/}
                {/*    <h1>Reviews</h1>*/}
                {/*</div>*/}
            </div>

            <Footer/>
        </>
    )
}

export default ListingDetailsPage