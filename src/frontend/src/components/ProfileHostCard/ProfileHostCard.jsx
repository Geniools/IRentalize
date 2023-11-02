import React from "react";

import styles from "./ProfileHostCard.module.css";

const ProfileHostCard = ({hostUsername, hostFirstName, hostImage}) => {
    const host = {
        username: hostUsername,
        first_name: hostFirstName,
        image: hostImage,
        validName: hostUsername ? hostUsername : hostFirstName,
    }

    return (
        <>
            <div className={styles.card}>
                <button className={styles.mail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </button>
                <div className={styles.profilePic}>
                    <img src={host.image} alt={host.validName}/>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.content}>
                        <span className={styles.name}>{host.validName}</span>
                        <span className={styles.aboutMe}>Lorem ipsum dolor sit amet consectetur adipisicinFcls </span>
                    </div>

                    <div className={styles.bottomBottom}>
                        <div>
                            {/* TODO: Implement response time */}
                            <span>Within a day</span>
                        </div>

                        <button className={styles.button}>Contact Me</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHostCard;