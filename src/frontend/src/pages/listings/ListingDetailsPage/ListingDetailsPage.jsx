import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/Loader/Loader";
import ModalImage from "../../../components/ModalImage/ModalImage";
import HeadTitle from "../../../components/HeadTitle/HeadTitle";
import GoogleMapContainer from "../../../components/GoogleMapContainer/GoogleMapContainer";

import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
    const navigator = useNavigate();
    const {id} = useParams();
    const [listing, setListing] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`/api/listings/${id}`)
            .then(res => {
                // console.log("Listing data:", res);
                setListing(res.data);
            })
            .catch(error => {
                // console.log("Error fetching listing data:", error);
                // Redirect to 404 page if listing is not found
                navigator("/404");
            });
    }, [id]);

    // Format the date - Example: "Aug 30, 2023, 02:11 PM"
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}

    if (!listing) return <>
        <Header/>
        <div className={"flex-vertically-centered flex-horizontally-center space-filler"}>
            <Loader/>
        </div>
    </>;

    return (
        <>
            <Header/>

            <div className="page-container">
                {/* Title and address */}
                <div className={styles.section}>
                    <HeadTitle title={listing.title} capitalize={true}/>
                    <p>{listing.address}</p>
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
                        <p>{listing.description}</p>

                        <p><b>Created at: </b>{new Date(listing.created_at).toLocaleString('en-US', dateOptions)}</p>
                        <p><b>Updated at: </b>{new Date(listing.updated_at).toLocaleString('en-US', dateOptions)}</p>
                    </div>
                </div>

                <hr/>

                {/* Host */}
                <div className={styles.section}>
                    <div className={styles.footer}>
                        {/*TODO: Display Host info*/}
                        <p>{listing.host}</p>
                        <button>Book Now</button>
                    </div>
                </div>

                <hr/>

                {/* Reviews */}
                <div className={styles.section}>

                </div>

                <hr/>

                {/* Map */}
                <div className={styles.section}>
                    <h2>{listing.zip_code} {listing.street} {listing.house_number} {listing.house_addition}</h2>

                    <GoogleMapContainer latitude={listing.latitude} longitude={listing.longitude}/>
                </div>

                <hr/>

                {/* Book now and Calendar with availability */}
                <div className={styles.section}>
                </div>

                <hr/>

                {/* Similar listings */}
                <div className={styles.section}>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ListingDetailsPage;