import React, {useEffect, useState} from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ListingLink from "../components/ListingLink";
import ListingSearchForm from "../components/ListingSearchForm";
import axios from "axios";

const IndexPage = () => {
    const [listings, setListings] = useState([]);
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        getListings({});
    }, []);

    const getListings = ({url = "/api/listings/", filters}) => {
        let queryParams = "";

        // Loop through the filters object and append each key and value to the queryParams string
        for (const key in filters) {
            if (filters[key] !== "") {
                queryParams += `${key}=${filters[key]}&`;
            }
        }
        if (queryParams !== "") {
            // Remove the last character from the queryParams string (which will be a &)
            url = `${url}?${queryParams.slice(0, -1)}`;
        }

        console.log(url);

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
        getListings({url: previous});
    }

    const handleNext = () => {
        getListings({url: next});
    }

    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <ListingSearchForm onSubmit={getListings}/>

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
