import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {connect} from "react-redux"
import moment from "moment"

import axiosInstanceJSONAPI from "../../../services/axios/axios_content_type_json.ts"

import ListingForm from "../../../components/ListingForm/ListingForm"
import PopupConfirmation from "../../../components/PopupConfirmation/PopupConfirmation"
import Loader from "../../../components/Loader/Loader.js"
import HeadTitle from "../../../components/HeadTitle.tsx"

import {USER_POSTS_URL} from "../../../utils/constants/URL_PATHS.ts"

import "../Userdashboard.css"
import "./UserPostDetailsPage.css"


const UserPostDetailsPage = () => {
    const navigate = useNavigate()
    // Listing's id in the database
    const {id} = useParams()
    // Listing's details
    const [listing, setListing] = useState(null)
    // Availabilities of the listing
    const [availabilities, setAvailabilities] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
        },
    ])
    // Availability to add
    const [availability, setAvailability] = useState({
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
    })
    // Image to delete
    const [imageToDelete, setImageToDelete] = useState(null)
    // Post to delete
    const [postDeleted, setPostDeleted] = useState(false)
    // Availability to delete
    const [availabilityToDelete, setAvailabilityToDelete] = useState(null)

    useEffect(() => {
        getListing()
        getAvailabilities()
    }, [])

    const getListing = (delay = 0) => {
        setTimeout(() => {
            // Retrieve the listing based on the id
            axiosInstanceJSONAPI.get(`/api/user-listings/${id}`)
                .then(data => {
                    setListing(data.data)
                })
                .catch(err => {
                    console.log("Error getting the listing:", err)
                    navigate(USER_POSTS_URL)
                })
        }, delay)
    }

    const getAvailabilities = () => {
        // Get the availabilities of the listing
        axiosInstanceJSONAPI.get(`/api/user-listing-availabilities/?listing=${id}`)
            .then(data => {
                setAvailabilities(data.data)
            })
            .catch(err => {
                console.log("Error getting the availabilities:", err)
                // TODO: Handle the error
            })
    }

    // Adding availability
    const handleAvailabilityChange = (e) => {
        // Convert the date to the correct format
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD')

        setAvailability({
            ...availability,
            [e.target.name]: newDate,
        })
    }

    const handleAddAvailability = async (e) => {
        e.preventDefault()

        const startDate = availability.startDate
        const endDate = availability.endDate

        const body = JSON.stringify({listing: id, start_date: startDate, end_date: endDate})

        try {
            await axiosInstanceJSONAPI.post('/api/user-listing-availabilities/', body)
            // Get the new availabilities
            getAvailabilities()
            return true
        } catch (err) {
            console.log(err)
            return err
        }
    }

    // Deletion functions
    const onDeleteImage = (id) => {
        setImageToDelete(id)
    }

    const onPostDelete = () => {
        setPostDeleted(true)
    }

    const onDeleteAvailability = (id) => {
        setAvailabilityToDelete(id)
    }

    // Confirmation functions
    const onConfirmDeleteImage = () => {
        // Delete the image from the database
        axiosInstanceJSONAPI.delete(`/api/user-listing-images/${imageToDelete}`)
            .then(data => {
                getListing()
            })
            .catch(err => {
                console.log(err)
            })

        // Close the popup
        setImageToDelete(null)
    }

    const onConfirmDeletePost = () => {
        // Delete the post from the database
        axiosInstanceJSONAPI.delete(`/api/user-listings/${id}`)
            .then(data => {
                navigate(USER_POSTS_URL)
            })
            .catch(err => {
                console.log("Error deleting the post:", err)
            })

        // Close the popup
        setPostDeleted(false)
    }

    const onConfirmDeleteAvailability = () => {
        // Delete the availability from the database
        axiosInstanceJSONAPI.delete(`/api/user-listing-availabilities/${availabilityToDelete}`)
            .then(data => {
                getAvailabilities()
            })
            .catch(err => {
                console.log(err)
            })

        // Close the popup
        setAvailabilityToDelete(null)
    }

    // Cancellation functions
    const onCancelDeleteImage = () => {
        setImageToDelete(false)
    }

    const onCancelDeletePost = () => {
        setPostDeleted(false)
    }

    const onCancelDeleteAvailability = () => {
        setAvailabilityToDelete(null)
    }

    if (!listing) {
        return <Loader/>
    }

    return (
        <>
            <HeadTitle title={`Edit '${listing.title}'`}/>

            <ListingForm listingDetails={listing} update={true} onSubmitExtraFunc={() => getListing(500)}/>
            <button className={"delete"} title="Delte the listing" onClick={onPostDelete}>Delete</button>

            <hr/>

            <HeadTitle title={"Add days when the listing is available"}/>

            <div className="dashboard-right-panel-content-listings">
                {
                    availabilities.map(((availability, index) => (
                        <div key={index} className="listing-availability-container">
                            <input type="date" value={availability.start_date}/>
                            <input type="date" value={availability.end_date}/>

                            <button
                                className="listing-availability-container-delete-button delete"
                                title="Delete the availability"
                                onClick={() => onDeleteAvailability(availability.id)}
                            >
                                X
                            </button>
                        </div>
                    )))
                }

                <div className="listing-availability-container">
                    <div>
                        <b><label htmlFor="startDate">Start date:</label></b>
                        <input type="date" name="startDate" title="Start Date" value={availability.startDate}
                               onChange={handleAvailabilityChange}/>
                    </div>
                    <div>
                        <b><label htmlFor="endDate">End date:</label></b>
                        <input type="date" name="endDate" title="End Date" value={availability.endDate}
                               onChange={handleAvailabilityChange}/>
                    </div>

                    <button onClick={handleAddAvailability} type={"button"} title={"Add a new availability"}>Add
                        availability
                    </button>
                </div>
            </div>

            <hr/>

            <HeadTitle title={"Current pictures"}/>

            <div className="dashboard-right-panel-content-listings">
                {
                    listing.images && (
                        listing.images.map(image => (
                            <div key={image.id} className="listing-editable-image-container">
                                <button className="delete" title="Delete the picture"
                                        onClick={() => onDeleteImage(image.id)}>
                                    X
                                </button>
                                <img title={image.image} src={image.image} alt={`Image ${image.id}`}/>
                            </div>
                        ))
                    ) || <Loader/>
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
            {
                availabilityToDelete && (
                    <PopupConfirmation
                        title={"Delete availability"}
                        message={"Are you sure you want to delete this availability?"}
                        onConfirm={onConfirmDeleteAvailability}
                        onCancel={onCancelDeleteAvailability}
                    />
                )
            }
            {/* ============ */}
        </>
    )
}

export default connect(null, null)(UserPostDetailsPage)