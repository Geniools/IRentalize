import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

import {loadUserListings} from "../../../actions/listing";

import ListingLink from "../../../components/ListingLink/ListingLink";
import ListingForm from "../../../components/ListingForm/ListingForm";

import "../Userdashboard.css";

const UserPostsPage = ({listings, loadUserListings}) => {
    useEffect(() => {
        loadUserListings();
    }, []);

    const [formVisibility, setFormVisibility] = useState(null);

    const changeFormVisibility = () => {
        setFormVisibility(!formVisibility);
    }

    return (
        <>
            <div className="dashboard-right-panel-header">
                <h1>MY POSTS</h1>
            </div>

            <button onClick={changeFormVisibility}>{formVisibility ? 'Hide Form' : 'Add Post +'}</button>

            <div className="dashboard-right-panel-content">
                {formVisibility ? <ListingForm update={false}/> : null}

                <hr/>

                <div className="dashboard-right-panel-content-listings">
                    {
                        listings?.map((listing) => (
                            <ListingLink listing={listing} url={"/account/user-posts/"}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    listings: state.listing.listings,
});

export default connect(mapStateToProps, {loadUserListings})(UserPostsPage);