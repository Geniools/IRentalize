import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"

import Header from "../../../components/Header.tsx"
import ModalImage from "../../../components/ModalImage/ModalImage"
import HeadTitle from "../../../components/HeadTitle.tsx"

import Footer from "../../../components/Footer.tsx"

import styles from "../ListingDetailsPage/partials/ImageGalerySection/ImageGallerySection.module.css"
import sectionStyles from "../ListingDetailsPage/ListingDetailsPage.module.css"

export default function ListingAllImagesPage() {
    const navigator = useNavigate()
    const {id} = useParams()
    const [listingImages, setListingImages] = useState(null)
    const [listingTitle, setListingTitle] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    // Collect all the images from the listing
    useEffect(() => {
        axios.get(`/api/listings/${id}`)
            .then(res => {
                // console.log("Listing data:", res);
                setListingImages(res.data.images)
                setListingTitle(res.data.title)
            })
            .catch(error => {
                // console.log("Error fetching listing data:", error);
                // Redirect to 404 page if listing is not found
                navigator("/404")
            })
    }, [id])

    return (
        <>
            <Header/>

            <div className="page-container">
                <div className={sectionStyles.section}>
                    <HeadTitle title={`More Images for '${listingTitle}'`} capitalize={true}/>
                </div>

                <hr/>

                <div className={sectionStyles.section}>
                    <div className={styles.imageGallery}>
                        {listingImages?.map(image => (
                            <div className={styles.imageContainer} onClick={() => setSelectedImage(image.image)}>
                                <img title={image.image} src={image.image} alt={image.id}/>
                            </div>
                        ))}
                    </div>
                </div>

                {
                    // If an image is selected, display it in a modal
                    selectedImage && <ModalImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                }
            </div>

            <Footer/>
        </>
    )
}