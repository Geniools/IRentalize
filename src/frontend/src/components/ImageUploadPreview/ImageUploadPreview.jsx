import React, {useRef, useState} from 'react';

import ProfileHostCard from "../ProfileHostCard/ProfileHostCard";

import styles from './ImageUploadPreview.module.css'; // Your CSS module for this component

const ImageUploadPreview = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [imageAspectValid, setImageAspectValid] = useState(true);
    const imageRef = useRef();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageLoaded = () => {
        setImageAspectValid(isImageAspectValid(imageRef.current));
    };

    const isImageAspectValid = (img) => {
        return img.naturalWidth === img.naturalHeight;
    };

    return (
        <div className={styles.previewContainer}>
            <input type="file" onChange={handleImageChange} accept="image/*"/>
            {imageSrc && (
                <>
                    <ProfileHostCard host={{image: imageSrc}}/>
                    <div className={styles.imagePreview}>
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            onLoad={handleImageLoaded}
                            alt="Preview"
                            className={styles.previewImage}
                        />
                        {!imageAspectValid && (
                            <>
                                <p className={styles.error}>Image aspect ratio is not 1:1. Please upload a square image.</p>
                            </>
                        )}
                        <p className={styles.error}>Make sure to hover over the card to check if the image is displayed the way you desire!</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageUploadPreview;
