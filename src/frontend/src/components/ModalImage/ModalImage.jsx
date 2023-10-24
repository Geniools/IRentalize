import React from "react";

import styles from "./ModalImage.module.css";

export default function ModalImage({selectedImage, setSelectedImage}) {
    return (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} alt="Selected"/>
        </div>
    )
}