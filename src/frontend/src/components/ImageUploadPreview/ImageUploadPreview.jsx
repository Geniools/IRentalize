import React, {useRef, useState} from 'react';

import ProfileHostCard from "../ProfileHostCard/ProfileHostCard";

import styles from './ImageUploadPreview.module.css';

const ImageUploadPreview = ({currentImage, hostUsername, hostFirstName}) => {
    const imageRef = useRef();
    const [imageAspectValid, setImageAspectValid] = useState(true);


    const handleImageLoaded = () => {
        setImageAspectValid(isImageAspectValid(imageRef.current));
    };

    const isImageAspectValid = (img) => {
        return img.naturalWidth === img.naturalHeight;
    };

    return (
        <div className={styles.previewContainer}>

            <div className={`${"flex-horizontally-center"} ${styles.imageContainerPreview}`}>
                <ProfileHostCard hostUsername={hostUsername} hostFirstName={hostFirstName} hostImage={currentImage}/>

                <div className={styles.imagePreview}>
                    <img
                        ref={imageRef}
                        src={currentImage}
                        onLoad={handleImageLoaded}
                        alt="Preview"
                        className={styles.previewImage}
                    />
                </div>
            </div>

            <div className={styles.errorContainer}>
                <p className={`${styles.errorMessage} ${styles.warning}`}>Make sure to hover over the card to check if the image is displayed the way you desire!</p>
                {
                    !imageAspectValid && (
                        <p className={`${styles.errorMessage} ${styles.error}`}>Image aspect ratio is not 1:1. Such an image is likely to not display properly!</p>
                    )
                }
            </div>
        </div>
    );
}

export default ImageUploadPreview;
