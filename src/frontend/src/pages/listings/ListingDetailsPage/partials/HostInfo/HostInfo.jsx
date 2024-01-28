import React, {useState} from "react";

import ProfileHostCard from "../../../../../components/ProfileHostCard/ProfileHostCard";
import DateFormatter from "../../../../../components/DateFormatter/DateFormatter";

import styles from "./HostInfo.module.css";
import generateStyles from "../ListingDetailsGeneral.module.css";

const HostInfo = (
    {
        hostFirstName, hostUsername,
        hostProfilePicture, hostAboutMe,
        hostMemberSince, hostResponseTime
    }
) => {
    const [showMoreDescriptionHost, setShowMoreDescriptionHost] = useState(false);

    return (
        <div className={`${styles.hostContainer}`}>
            <div>
                <ProfileHostCard hostFirstName={hostFirstName} hostUsername={hostUsername} hostImage={hostProfilePicture}/>
            </div>

            <div className={styles.hostInfo}>
                <p className={styles.descriptionContainer}><b>About the host: </b>
                    <pre style={{display: showMoreDescriptionHost ? 'block' : '-webkit-box'}} className={generateStyles.description}>
                                    {hostAboutMe}
                    </pre>

                    <button onClick={() => setShowMoreDescriptionHost(!showMoreDescriptionHost)} className={generateStyles.button}>
                        {showMoreDescriptionHost ? "Show less" : "Show more"}
                    </button>
                </p>

                <p><b>Member since: </b><DateFormatter date={hostMemberSince} showTime={false}/></p>
                {
                    hostResponseTime !== null && (
                        <p><b>Response time: </b>{hostResponseTime}</p>
                    )
                }
                {/*<p><b>Response rate: </b>{listing.host_response_rate}%</p>*/}
            </div>
        </div>
    )
}

export default HostInfo;