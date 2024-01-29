import React, {useState} from "react";

import FadingButton from "../FadingButton/FadingButton";

import styles from "./InformationDateContainer.module.css";

const InformationDateContainer = ({text, dates}) => {
    const [showAllText, setShowAllText] = useState(false);

    return (
        <div className={styles.info}>
            <div className={styles.descriptionContainer}>
                <pre style={{display: showAllText ? 'block' : '-webkit-box'}} className={styles.description}>
                    {text}
                </pre>
            </div>

            <div className={styles.infoDatesContainer}>
                <div className={styles.infoDates}>
                    {dates}
                </div>
                <div className={styles.buttonContainer}>
                    <FadingButton onClick={() => setShowAllText(!showAllText)}>
                        {showAllText ? "Show less" : "Show more"}
                    </FadingButton>
                </div>
            </div>
        </div>
    )
}

export default InformationDateContainer;