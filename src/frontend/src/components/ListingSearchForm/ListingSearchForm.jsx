import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

import {loadCategories, loadListings} from "../../actions/listing";

import "./ListingSearchForm.css";

const SearchForm = ({categories, loadListings, loadCategories}) => {
    const navigator = useNavigate();
    useEffect(() => {
        loadCategories();
    }, []);

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        description: '',
        address: '',
        price: ''
    });

    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleSubmit = event => {
        event.preventDefault();
        navigator("/");
        loadListings({filters: formData});
    };

    return (
        <form className={`listing-search-form`} onSubmit={handleSubmit}>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
                <option>Select category...</option>
                {
                    categories?.map((category) => (
                        <option value={category.id}>{category.name}</option>
                    ))
                }
            </select>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title"/>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address"/>
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price"/>

            <button type="submit">Search</button>
        </form>
    );
};

const mapStateToProps = state => ({
    categories: state.listing.categories,
});

export default connect(mapStateToProps, {loadListings, loadCategories})(SearchForm);
