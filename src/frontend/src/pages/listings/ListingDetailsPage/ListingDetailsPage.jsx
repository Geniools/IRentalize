import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {addBooking} from "../../../actions/listing";
import {setNavigateToAfterAuth} from "../../../actions/common";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/ui/Loader/Loader";
import ModalImage from "../../../components/ModalImage/ModalImage";
import HeadTitle from "../../../components/ui/HeadTitle/HeadTitle";
import GoogleMapContainer from "../../../components/GoogleMapContainer/GoogleMapContainer";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import ProfileHostCard from "../../../components/ProfileHostCard/ProfileHostCard";
import HeadSubTitle from "../../../components/ui/HeadSubTitle/HeadSubTitle";
import BookingCalendar from "../../../components/BookingCalendar/BookingCalendar";

import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = ({isAuthenticated, user, setNavigateToAfterAuth, addBooking}) => {
    const navigator = useNavigate();
    const {id} = useParams();
    const [listing, setListing] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showMoreDescriptionListing, setShowMoreDescriptionListing] = useState(false);
    const [showMoreDescriptionHost, setShowMoreDescriptionHost] = useState(false);
    const [errorMessages, setErrorMessages] = useState(["Select a date to book this listing!"]);
    const [bookingDates, setBookingDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [canBook, setCanBook] = useState(false);

    useEffect(() => {
        axios.get(`/api/listings/${id}`)
            .then(res => {
                // console.log("Listing data:", res);
                setListing(res.data);
                document.title = res.data.title;
            })
            .catch(error => {
                // console.log("Error fetching listing data:", error);
                // Redirect to 404 page if listing is not found
                navigator("/404");
            });
    }, [id]);

    const handleBooking = () => {
        if (canBook) {
            // Check if user is logged in
            if (!isAuthenticated) {
                console.log("You need to be logged in to book this listing!")
                // TODO: Show error message
                // Set the navigateToAfterLogin state to the current page
                setNavigateToAfterAuth(`/listing/${id}/`);
                // Redirect to login page if user is not logged in
                return navigator("/login");
            }

            // Check if the user is the host of the listing
            if (user.id === listing.host) {
                console.log("You are the host of this listing!")
                // TODO: Show error message
                return;
            }

            let startDate = bookingDates[0].startDate.getFullYear() + "-";
            startDate += bookingDates[0].startDate.getMonth() + 1 + "-";
            startDate += bookingDates[0].startDate.getDate();

            let endDate = bookingDates[0].endDate.getFullYear() + "-";
            endDate += bookingDates[0].endDate.getMonth() + 1 + "-";
            endDate += bookingDates[0].endDate.getDate();
            const listingId = listing.id;

            addBooking({listingId, startDate, endDate});
        } else {
            console.log("There are still errors you need to fix!")
            console.log(errorMessages);
            // TODO: Show error message
        }
    }

    if (!listing) return (
        <>
            <Header/>

            <div className={"flex-vertically-centered flex-horizontally-center space-filler"}>
                <Loader/>
            </div>
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
                    <div className={styles.imageGallery}>
                        {
                            listing.images?.slice(0, 8).map(image => (
                                <div className={styles.imageContainer} onClick={() => setSelectedImage(image.image)}>
                                    <img title={image.image} src={image.image} alt={`Image ${image.id}`}/>
                                </div>
                            ))
                        }
                    </div>

                    {
                        // If there are more than 8 images, display a button to view all images
                        listing.images?.length > 8 && <button className={styles.button} onClick={() => navigator(`/listing/${id}/all-images/`)}>View more</button>
                    }
                </div>

                {
                    // If an image is selected, display it in a modal
                    selectedImage && <ModalImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                }

                <hr/>

                {/* Description */}
                <div className={styles.section}>
                    <div className={styles.info}>
                        <div className={styles.descriptionContainer}>
                            <pre style={{display: showMoreDescriptionListing ? 'block' : '-webkit-box'}} className={styles.description}>
                                {listing.description}
                            </pre>

                            <button onClick={() => setShowMoreDescriptionListing(!showMoreDescriptionListing)} className={styles.button}>
                                {showMoreDescriptionListing ? "Show less" : "Show more"}
                            </button>
                        </div>

                        <div className={styles.infoDates}>
                            <p><b>Posted on: </b><DateFormatter date={listing.created_at} showTime={false}/></p>
                            <p><b>Updated on: </b><DateFormatter date={listing.updated_at} showTime={false}/></p>
                        </div>
                    </div>
                </div>

                <hr/>

                {/* Host */}
                <div className={styles.section}>
                    <div className={`${styles.hostContainer}`}>
                        <div>
                            <ProfileHostCard hostFirstName={listing.host_first_name} hostUsername={listing.host_username} hostImage={listing.host_profile_picture}/>
                        </div>

                        <div className={styles.hostInfo}>
                            <p className={styles.descriptionContainer}><b>About the host: </b>
                                <pre style={{display: showMoreDescriptionHost ? 'block' : '-webkit-box'}} className={styles.description}>
                                    {listing.host_about_me}
                                </pre>

                                <button onClick={() => setShowMoreDescriptionHost(!showMoreDescriptionHost)} className={styles.button}>
                                    {showMoreDescriptionHost ? "Show less" : "Show more"}
                                </button>
                            </p>
                            <p><b>Member since: </b><DateFormatter date={listing.host_member_since} showTime={false}/></p>
                            {
                                listing.host_response_time !== null && (
                                    <p><b>Response time: </b>{listing.host_response_time}</p>
                                )
                            }
                            {/*<p><b>Response rate: </b>{listing.host_response_rate}%</p>*/}
                        </div>
                    </div>
                </div>

                <hr/>

                {/* Map */}
                {
                    // If the listing has no address, don't display the map
                    listing.address && (
                        <div className={styles.section}>
                            <HeadSubTitle title="Location"/>
                            <div className={styles.mapAddressInfo}>
                                <p><b>Zip Code: </b>{listing.address?.zip_code}</p>
                                <p><b>Street: </b>{listing.address?.street_name} {listing.address?.house_number} {listing.address?.house_addition}</p>
                            </div>

                            <GoogleMapContainer latitude={listing.address?.latitude} longitude={listing.address?.longitude}/>
                        </div>
                    ) || <Loader/>
                }

                <hr/>

                {/* Book now and Calendar with availability */}
                <div id="booking-section" className={styles.section}>
                    <div className={styles.bookingContainer}>
                        <BookingCalendar
                            availabilities={listing.availabilities}
                            unavailableDates={listing.unavailable_dates}
                            dayPrice={listing.price}
                            setCanBook={setCanBook}
                            errorMessages={errorMessages}
                            setErrorMessages={setErrorMessages}
                            bookingDates={bookingDates}
                            setBookingDates={setBookingDates}
                        />

                        <div>
                            <button className={styles.button} onClick={handleBooking}>Book now</button>
                        </div>
                    </div>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, {addBooking, setNavigateToAfterAuth})(ListingDetailsPage);