import React from "react";

import styles from "./ModalDisplay.module.css";

export default function ModalDisplay({children}) {
    return (
        <div className={styles.modal}>
            {children}
        </div>
    )
}