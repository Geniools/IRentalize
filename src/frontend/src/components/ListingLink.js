import React from "react";
import {Link} from "react-router-dom";

const ListingLink = ({listing, url}) => {
    const listingUrl = url + listing.id + "/";

    return (
        <Link to={listingUrl} className="listings-item-link-wrapper">
            <div className="listings-item">
                <div className="listings-item-image">
                    <img src={listing.images[0].image} alt={listing.title}/>
                </div>

                <div className="listings-item-info">
                    <h1>{listing.title}</h1>
                    <p>{listing.description}</p>
                    <p>{listing.price} <b><span>&euro;</span></b></p>
                    <i><p>{listing.address}</p></i>
                </div>
            </div>
        </Link>
    )
}

export default ListingLink;