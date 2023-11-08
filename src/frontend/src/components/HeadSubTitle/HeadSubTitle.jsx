import React from "react";

import styles from "./HeadSubTitle.module.css";

export default function HeadSubTitle({title, capitalize = false}) {
    return (
        <div className={styles.headSubTitle}>
            <h1>{capitalize ? title.toUpperCase() : title}</h1>
        </div>
    )
}