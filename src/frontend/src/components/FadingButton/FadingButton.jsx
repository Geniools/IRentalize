import React from "react";

import styles from "./FadingButton.module.css";

const FadingButton = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}

export default FadingButton;