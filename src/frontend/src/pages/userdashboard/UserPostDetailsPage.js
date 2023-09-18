import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import ListingForm from "../../components/ListingForm";
import {USER_POSTS_URL} from "../../UrlPaths";
import PopupConfirmation from "../../components/PopupConfirmation";
import axiosAuthInstanceAPI from "../../utils/axios/axios";

const UserPostDetailsPage = ({loadCategories}) => {
    // Listing's id in the database
    const {id} = useParams();
    const [listing, setListing] = useState(null);
    const [imageToDelete, setImageToDelete] = useState(null);
    const [postDeleted, setPostDeleted] = useState(false);

    useEffect(() => {
        getListing();
    }, []);

    const getListing = () => {
        // Retrieve the listing based on the id
        axiosAuthInstanceAPI.get(`/api/user-listings/${id}`)
            .then(data => {
                setListing(data.data);
            })
            .catch(err => {
                console.log(err);
                return (
                    <Navigate to={USER_POSTS_URL}/>
                )
            });
    }
    const onDeleteImage = (id) => {
        setImageToDelete(id);
    }

    const onPostDelete = () => {
        setPostDeleted(true);
    }

    const onConfirmDeleteImage = () => {
        console.log("Image is being deleted!: ", imageToDelete);

        // Delete the image from the database
        axiosAuthInstanceAPI.delete(`/api/listing-images/${imageToDelete}`)
            .then(data => {
                console.log(data);
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
                console.log(data);
                setPostDeleted(true);
            })
            .catch(err => {
                console.log(err);
            });

        // Close the popup
        setPostDeleted(false);
    }

    const onCancelDeleteImage = () => {
        setImageToDelete(null);
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

                <ListingForm listingDetails={listing}/>
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
            </>
        )
    }
}

export default connect(null, null)(UserPostDetailsPage);