import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from "./ListingDetailsPage.module.css";

const ListingDetailsPage = () => {
    const navigator = useNavigate();
    const {id} = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        // Fetch listing data by ID. Replace with your API endpoint.
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

    if (!listing) return <>
        <Header/>
        <div>Loading...</div>
    </>;

    return (
        <>
            <Header/>

            <div className="page-container">
                {/* TODO: Style this page */}
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>{listing.title}</h1>
                        <p>{listing.address}</p>
                    </div>

                    <div className={styles.images}>
                        {
                            listing.images?.map(image => (
                                <div key={image.id}>
                                    <img title={image.image} src={image.image} alt={`Image ${image.id}`}/>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles.amenities}>
                        <h2>About</h2>
                        <p>{listing.description}</p>
                    </div>

                    <div className={styles.footer}>
                        <h2>Host Extraordinaire</h2>
                        <p>{listing.host}</p>
                        <button>Book Now</button>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ListingDetailsPage;