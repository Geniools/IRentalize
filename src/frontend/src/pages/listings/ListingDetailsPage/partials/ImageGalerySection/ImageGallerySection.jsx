import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import ModalImage from "../../../../../components/ModalImage/ModalImage";

import styles from "./ImageGallerySection.module.css";
import FadingButton from "../../../../../components/FadingButton/FadingButton";

const ImageGallerySection = ({images, listingId}) => {
    const navigator = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [pictureThreshold, setPictureThreshold] = useState(8);

    // Change the pictureThreshold to 4 if the screen width is less than 550px
    // TODO: Make this responsive
    // if (window.innerWidth < 550 && pictureThreshold !== 4) {
    //     setPictureThreshold(4);
    // }

    return (
        <div className={styles.container}>
            <div className={styles.imageGallery}>
                {
                    images?.slice(0, 8).map(image => (
                        <div className={styles.imageContainer} onClick={() => setSelectedImage(image.image)}>
                            <img title={image.image} src={image.image} alt={`Image ${image.id}`}/>
                        </div>
                    ))
                }
            </div>

            <div className={"flex-container flex-right-content"}>
                {
                    // If there are more than 8 images, display a button to view all images
                    images?.length > pictureThreshold && (
                        <FadingButton onClick={() => navigator(`/listing/${listingId}/all-images/`)}>
                            View more
                        </FadingButton>
                    )
                }
            </div>

            {
                // If an image is selected, display it in a modal
                selectedImage && <ModalImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            }
        </div>
    )
}

export default ImageGallerySection;