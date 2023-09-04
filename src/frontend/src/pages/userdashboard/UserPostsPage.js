import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addPost, loadCategories, loadListings} from "../../actions/listing";

const UserPostsPage = ({listings, categories, addPost, loadCategories, loadListings}) => {
    useEffect(() => {
        loadCategories();
        loadListings();
    }, []);

    const [formVisibility, setFormVisibility] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        address: '',
        images: [],
    });

    const {title, description, category, price, address} = formData;


    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const changeFormVisibility = () => {
        setFormVisibility(!formVisibility);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        addPost(title, description, price, address);
    }

    return (
        <>
            <div className="dashboard-right-panel-header">
                <h1>MY POSTS</h1>
            </div>

            <button onClick={changeFormVisibility}>{formVisibility ? 'Hide Form' : 'Add Post +'}</button>

            <div className="dashboard-right-panel-content">
                {formVisibility ?
                    <form onSubmit={onSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Title" value={title} onChange={onChange}/>

                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder="Description" value={description} onChange={onChange}></textarea>

                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" placeholder="Price" value={price} onChange={onChange}/>

                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={category} onChange={onChange}>
                            {categories.results.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" placeholder="Address" value={address} onChange={onChange}/>

                        <label htmlFor="images">Images</label>
                        <input type="file" id="images" name="images" placeholder="Images" value={address} onChange={onChange} multiple/>

                        <button type="submit">Add Post</button>
                    </form>
                    : null
                }

                <hr/>

                <div className="dashboard-right-panel-content-listings">
                    {listings.results?.map((listing) => (
                        <div className="dashboard-right-panel-content-listings-item">
                            {listing}
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

const mapStateToProps = state => ({
    listings: state.listing.listings,
    categories: state.listing.categories,
});

export default connect(mapStateToProps, {addPost, loadCategories, loadListings})(UserPostsPage);