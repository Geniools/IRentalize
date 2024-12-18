import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"

import {loadUserListings} from "../../../actions/listing"

import ListingForm from "../../../components/ListingForm/ListingForm"
import HeadTitle from "../../../components/HeadTitle.tsx"
import ListingCard from "../../../components/ListingCard.tsx"

import "../Userdashboard.css"

const UserPostsPage = ({listings, loadUserListings}) => {
    useEffect(() => {
        loadUserListings()
    }, [])

    const [formVisibility, setFormVisibility] = useState(null)

    const changeFormVisibility = () => {
        setFormVisibility(!formVisibility)
    }

    return (
        <>
            <HeadTitle title={"My Posts"} capitalize={true}/>

            <button onClick={changeFormVisibility}>{formVisibility ? 'Hide Form' : 'Add Post +'}</button>

            <div className="dashboard-right-panel-content">
                {formVisibility ? <ListingForm/> : null}

                <hr/>

                <div className="dashboard-right-panel-content-listings">
                    {
                        listings?.map((listing) => (
                            <ListingCard listing={listing} url={"/account/user-posts/"}/>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    listings: state.listing.listings,
})

export default connect(mapStateToProps, {loadUserListings})(UserPostsPage)