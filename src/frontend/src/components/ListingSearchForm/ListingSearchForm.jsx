// SearchForm.js
import React, {useState} from 'react';

const SearchForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        description: '',
        address: '',
        price: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({filters: formData});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category"/>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title"/>
            <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address"/>
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price"/>

            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
