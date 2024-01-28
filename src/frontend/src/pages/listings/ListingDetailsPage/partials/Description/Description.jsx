import React, {useState} from "react";

import DateFormatter from "../../../../../components/DateFormatter/DateFormatter";

import styles from "./Description.module.css";
import generalStyles from "../ListingDetailsGeneral.module.css";

const Description = ({description, createdAt, updatedAt}) => {
    const [showMoreDescriptionListing, setShowMoreDescriptionListing] = useState(false);

    return (
        <div className={styles.info}>
            <div className={generalStyles.descriptionContainer}>
                <pre style={{display: showMoreDescriptionListing ? 'block' : '-webkit-box'}} className={generalStyles.description}>
                    {description}
                </pre>

                <button onClick={() => setShowMoreDescriptionListing(!showMoreDescriptionListing)} className={generalStyles.button}>
                    {showMoreDescriptionListing ? "Show less" : "Show more"}
                </button>
            </div>

            <div className={styles.infoDates}>
                <p><b>Posted on: </b><DateFormatter date={createdAt} showTime={false}/></p>
                <p><b>Updated on: </b><DateFormatter date={updatedAt} showTime={false}/></p>
            </div>
        </div>
    )
}

export default Description;