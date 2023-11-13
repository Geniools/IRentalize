import React from "react";
import {connect} from "react-redux";

import {loadListings} from "../../actions/listing";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import ListingLink from "../../components/ListingLink/ListingLink";

import "./IndexPage.css";

const IndexPage = ({loadListings, listings, next, previous}) => {
    const handlePrevious = () => {
        loadListings({url: previous});
    }

    const handleNext = () => {
        loadListings({url: next});
    }

    return (
        <>
            <Header/>

            <div className="page-container">
                <div className="listings">
                    {
                        !listings ? (
                            <div className="flex-horizontally-center space-filler">
                                <Loader/>
                            </div>
                        ) : (
                            listings?.length === 0 ? (
                                <div className="flex-horizontally-center space-filler">
                                    <h1>No listings found</h1>
                                </div>
                            ) : (
                                listings?.map(listing => (
                                    <ListingLink listing={listing} url="/listing/"/>
                                ))
                            )
                        )
                    }
                </div>
            </div>

            {/* TODO: Implement pagination */}

            <Footer/>
        </>
    );
}

const mapStateToProps = state => ({
    listings: state.listing.listings,
    previous: state.listing.previous,
    next: state.listing.next
});

export default connect(mapStateToProps, {loadListings})(IndexPage);
