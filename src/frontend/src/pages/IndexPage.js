import React, {useEffect, useState} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../utils/axios/axios";
import ListingLink from "../components/ListingLink";

const IndexPage = () => {
    const [listings, setListings] = useState([]);
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        getListings();
    }, []);

    const getListings = (url = "/api/listings") => {
        axios.get(url)
            .then(res => {
                setListings(res.data.results);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handlePrevious = () => {
        getListings(previous);
    }

    const handleNext = () => {
        getListings(next);
    }

    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <div className="listings">
                    {listings.map(listing => (
                        <ListingLink listing={listing} url=""/>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default IndexPage;
