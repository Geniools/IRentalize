import React, {useState} from "react";
import {Link} from "react-router-dom";

const ListingLink = ({listing, url}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const listingUrl = url + listing.id + "/";
    const [previous, setPrevious] = useState(false);
    const [next, setNext] = useState(false);

    // TODO: Fix the previous and next buttons display
    // useEffect(() => {
    //     if (listing.images.length > 0 && currentImageIndex < listing.images.length) {
    //         setNext(true);
    //     }
    //
    //     if (currentImageIndex > 0) {
    //         setPrevious(true);
    //     }
    // }, [previous, next]);

    const handleImageRightSlide = (event) => {
        if (currentImageIndex === listing.images.length - 1) {
            setCurrentImageIndex(0);
        } else {
            setCurrentImageIndex(currentImageIndex + 1);
        }
        event.preventDefault()
    }

    const handleImageLeftSlide = (event) => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(listing.images.length - 1);
        } else {
            setCurrentImageIndex(currentImageIndex - 1);
        }
        event.preventDefault()
    }

    return (
        <Link to={listingUrl} className="listings-item-link-wrapper">
            <div className="listings-item">
                <div className="listings-item-image">
                    <img src={listing.images[currentImageIndex].image} alt={listing.title}/>
                    {/* TODO: Do not display the arrow if there are no images in that direction */}
                    <div className={`${!previous ? 'hidden' : ''} image-thumbnail image-thumbnail-left `}>
                        <button type="button" className="image-thumbnail-button" onClick={handleImageLeftSlide}>&#10094;</button>
                    </div>

                    {/* TODO: Do not display the arrow if there are no images in that direction */}
                    <div className={`${!previous ? 'hidden' : ''} image-thumbnail image-thumbnail-right `}>
                        <button type="button" className="image-thumbnail-button" onClick={handleImageRightSlide}>&#10095;</button>
                    </div>
                </div>

                <div className="listings-item-info">
                    <h1>{listing.title}</h1>
                    <p>{listing.description}</p>
                    <p>{listing.price} <b><span>&euro;</span></b></p>
                    <i><p>{listing.address}</p></i>
                    <div className="listing-ranking">
                        {/*TODO: Implement ranking*/}
                        <span>5.0</span>
                        <span>&#9733;</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListingLink;