import React from "react";

import styles from "./HeadTitle.module.css";

export default function HeadTitle({title, capitalize = false}) {
    return (
        <div className={styles.headTitle}>
            <h1>{capitalize ? title.toUpperCase() : title}</h1>
        </div>
    )
}