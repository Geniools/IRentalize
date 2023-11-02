import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {connect} from "react-redux";

import axiosAuthInstanceAPI from "../../../utils/axios/axios";

import ListingForm from "../../../components/ListingForm/ListingForm";
import PopupConfirmation from "../../../components/PopupConfirmation/PopupConfirmation";

import {USER_POSTS_URL} from "../../../URL_PATHS";

import "../Userdashboard.css";
import "./UserPostDetailsPage.css";

const UserPostDetailsPage = () => {
    const navigate = useNavigate();
    // Listing's id in the database
    const {id} = useParams();
    const [listing, setListing] = useState(null);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [postDeleted, setPostDeleted] = useState(false);

    useEffect(() => {
        getListing();
    }, []);

    const getListing = (delay = 0) => {
        setTimeout(() => {
            // Retrieve the listing based on the id
            axiosAuthInstanceAPI.get(`/api/user-listings/${id}`)
                .then(data => {
                    setListing(data.data);
                })
                .catch(err => {
                    console.log("Error getting the listing:", err);
                    navigate(USER_POSTS_URL);
                });
        }, delay);
    }

    // Deletion functions
    const onDeleteImage = (id) => {
        setImageToDelete(id);
    }

    const onPostDelete = () => {
        setPostDeleted(true);
    }

    // Confirmation functions
    const onConfirmDeleteImage = () => {
        console.log("Image is being deleted!: ", imageToDelete);

        // Delete the image from the database
        axiosAuthInstanceAPI.delete(`/api/listing-images/${imageToDelete}`)
            .then(data => {
                getListing();
            })
            .catch(err => {
                console.log(err);
            });

        // Close the popup
        setImageToDelete(null);
    }

    const onConfirmDeletePost = () => {
        console.log("Post is being deleted!: ", id);

        // Delete the post from the database
        axiosAuthInstanceAPI.delete(`/api/user-listings/${id}`)
            .then(data => {
                navigate(USER_POSTS_URL);
            })
            .catch(err => {
                console.log("Error deleting the post:", err);
            });

        // Close the popup
        setPostDeleted(false);
    }

    // Cancellation functions
    const onCancelDeleteImage = () => {
        setImageToDelete(false);
    }

    const onCancelDeletePost = () => {
        setPostDeleted(false);
    }

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

                <ListingForm listingDetails={listing} update={true} onSubmitExtraFunc={() => getListing(500)}/>
                <button className={"delete"} onClick={onPostDelete}>Delete</button>

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

                {/* Popups */}
                {
                    imageToDelete && (
                        <PopupConfirmation
                            title={"Delete image"}
                            message={"Are you sure you want to delete this image?"}
                            onConfirm={onConfirmDeleteImage}
                            onCancel={onCancelDeleteImage}
                        />
                    )
                }
                {
                    postDeleted && (
                        <PopupConfirmation
                            title={"Delete post"}
                            message={"Are you sure you want to delete this post?"}
                            onConfirm={onConfirmDeletePost}
                            onCancel={onCancelDeletePost}
                        />
                    )
                }
                {/* ============ */}
            </>
        )
    }
}

export default connect(null, null)(UserPostDetailsPage);