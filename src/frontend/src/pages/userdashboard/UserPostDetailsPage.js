import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import ListingForm from "../../components/ListingForm";
import {USER_POSTS_URL} from "../../UrlPaths";

const UserPostDetailsPage = ({loadCategories}) => {
    // Listing's id in the database
    const {id} = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        // Retrieve the listing based on the id
        axios.get(`/api/listings/${id}`)
            .then(data => {
                setListing(data.data);
                console.log(listing);
            })
            .catch(err => {
                console.log(err);
                return (
                    <Navigate to={USER_POSTS_URL}/>
                )
            });
    }, []);

    const onDeleteImage = (id) => {
        console.log(id);
    }

    // TODO: verify if the post was made by the user, otherwise redirect him

    if (!listing) {
        return (
            <div className="dashboard-right-panel-header">
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="dashboard-right-panel-header">
                    <h1>EDIT <i>{listing.title}</i></h1>
                </div>

                <ListingForm listingDetails={listing}/>
                <button className={"delete"}>Delete</button>

                <hr/>

                <div className="dashboard-right-panel-header">
                    <h1>Current pictures</h1>
                </div>

                <div className="dashboard-right-panel-content-listings">
                    {
                        listing.images.map(image => (
                            <div key={image.id} className="listing-editable-image-container">
                                <button className="delete" title="Delete the picture" onClick={() => onDeleteImage(image.id)}>
                                    X
                                </button>
                                <img title={image.image} src={image.image} alt={`Image ${image.id}`}/>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }
}

export default connect(null, null)(UserPostDetailsPage);