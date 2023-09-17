import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {addPost, loadCategories, loadUserListings} from "../actions/listing";

const ListingForm = ({categories, loadCategories, addPost, loadUserListings, listingDetails}) => {
    useEffect(() => {
        loadCategories();

        console.log(listingDetails);
        if (listingDetails) {
            setFormData(listingDetails);
        }
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        address: '',
    });
    const [formImages, setFormImages] = useState([]);

    const {title, description, category, price, address} = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onImageChange = event => {
        setFormImages(event.target.files);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        addPost(title, description, category, price, address, formImages);
        loadUserListings();
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={onChange}/>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Description" value={description} onChange={onChange}></textarea>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" placeholder="Price" value={price} onChange={onChange}/>

                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={category} onChange={onChange}>
                    <option>Select category...</option>
                    {categories?.map((category) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>

                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" placeholder="Address" value={address} onChange={onChange}/>

                <label htmlFor="images">Images</label>
                <input type="file" id="images" name="images" accept="image/*" onChange={onImageChange} multiple/>

                <button type="submit">Save</button>
            </form>
        </>
    )
}

const mapStateToProps = state => ({
    categories: state.listing.categories,
});

export default connect(mapStateToProps, {addPost, loadCategories, loadUserListings})(ListingForm);