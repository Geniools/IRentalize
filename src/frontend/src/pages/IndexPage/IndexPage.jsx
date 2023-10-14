import React, {useEffect} from "react";
import {connect} from "react-redux";

import {loadListings} from "../../actions/listing";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ListingLink from "../../components/ListingLink/ListingLink";

import "./IndexPage.css";

const IndexPage = ({loadListings, listings, next, previous}) => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    
    const handlePrevious = () => {
        loadListings({url: previous});
    }

    const handleNext = () => {
        loadListings({url: next});
    }

    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <div className="listings">
                    {
                        listings?.length === 0 ? (
                            <div className="flex-center space-filler">
                                <h1>No listings found :(</h1>
                            </div>
                        ) : (
                            listings?.map(listing => (
                                <ListingLink listing={listing} url=""/>
                            ))
                        )
                    }
                </div>
            </div>

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
