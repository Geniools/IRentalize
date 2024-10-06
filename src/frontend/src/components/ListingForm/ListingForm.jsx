import React, {useEffect, useState} from "react"
import {connect} from "react-redux"

import {addListing, loadCategories, loadUserListings, updateListing} from "../../actions/listing"

import HeadSubTitle from "../HeadSubTitle.tsx"
import GoogleMapContainer from "../GoogleMapContainer/GoogleMapContainer"

const ListingForm = (
    {
        categories,
        loadCategories,
        addListing, updateListing, loadUserListings, listingDetails,
        onSubmitExtraFunc,
        update = false,
    },
) => {
    useEffect(() => {
        loadCategories()
    }, [])

    const [formData, setFormData] = useState({
        title: listingDetails?.title || '',
        description: listingDetails?.description || '',
        category: listingDetails?.category || '',
        price: listingDetails?.price || '',
        // Address details
        street_name: listingDetails?.address?.street_name || '',
        zip_code: listingDetails?.address?.zip_code || '',
        house_number: listingDetails?.address?.house_number || '',
        house_addition: listingDetails?.address?.house_addition || '',
    })
    const [formImages, setFormImages] = useState([])

    const {
        title, description, category, price,
        street_name, zip_code, house_number, house_addition,
    } = formData

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onImageChange = event => {
        setFormImages(event.target.files)
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        if (update === true) {
            // Get the listing's id
            const listingId = listingDetails.id
            // Update the listing
            updateListing({listingId, formData, formImages})
        } else {
            addListing({formData, formImages})
            // Reload the user's listings
            loadUserListings()

            // Clear the form
            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                // Address details
                street_name: '',
                zip_code: '',
                house_number: '',
                house_addition: '',
            })
        }

        setFormImages([])

        if (onSubmitExtraFunc) {
            onSubmitExtraFunc()
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <HeadSubTitle title="Listing"/>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={onChange}/>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Description" value={description}
                          onChange={onChange}></textarea>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" placeholder="Price" value={price} onChange={onChange}/>

                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={category} onChange={onChange}>
                    <option>Select category...</option>
                    {
                        categories?.map((category) => (
                            <option value={category.id}>{category.name}</option>
                        ))
                    }
                </select>

                <HeadSubTitle title="Address"/>

                <div className="dashboard-right-panel-content-line">
                    <div>
                        <label htmlFor="street_name">Street name:</label>
                        <input onChange={onChange} type="text" id="street_name" name="street_name"
                               placeholder="Street name" value={street_name}/>
                    </div>

                    <div>
                        <label htmlFor="zip_code">Zip code:</label>
                        <input onChange={onChange} type="text" id="zip_code" name="zip_code" placeholder="Zip code"
                               value={zip_code}/>
                    </div>
                </div>

                <div className="dashboard-right-panel-content-line">
                    <div>
                        <label htmlFor="house_number">House number:</label>
                        <input onChange={onChange} type="text" id="house_number" name="house_number"
                               placeholder="House number" value={house_number}/>
                    </div>

                    <div>
                        <label htmlFor="house_addition">House addition:</label>
                        <input onChange={onChange} type="text" id="house_addition" name="house_addition"
                               placeholder="House addition" value={house_addition}/>
                    </div>
                </div>

                {
                    listingDetails?.address && (
                        <GoogleMapContainer longitude={listingDetails.address.longitude}
                                            latitude={listingDetails.address.latitude}/>
                    )
                }

                <HeadSubTitle title="Images"/>

                <label htmlFor="images">Images</label>
                <input type="file" id="images" name="images" accept="image/png, image/jpg, image/jpeg"
                       onChange={onImageChange} multiple/>

                <button type="submit">Save</button>
            </form>
        </>
    )
}

const mapStateToProps = state => ({
    categories: state.listing.categories,
})

export default connect(mapStateToProps, {addListing, updateListing, loadCategories, loadUserListings})(ListingForm)