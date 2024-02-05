import React from "react";

import DateFormatter from "../DateFormatter/DateFormatter";
import ChatRoomNavigationButton from "../ChatRoomNavigationButton/ChatRoomNavigationButton";

import styles from "./ProfileHostCard.module.css";

const ProfileHostCard = ({hostUsername, hostFirstName, hostImage, hostMemberSince, chatRoom}) => {
    const host = {
        username: hostUsername,
        first_name: hostFirstName,
        image: hostImage ? hostImage : "/static/assets/default_avatar_male.png",
        validName: hostUsername ? hostUsername : hostFirstName,
    }

    return (
        <>
            <div className={styles.card}>
                <ChatRoomNavigationButton chatRoom={chatRoom} className={styles.mail}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </ChatRoomNavigationButton>

                <div className={styles.profilePic}>
                    <img src={host.image} alt={host.validName}/>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.content}>
                        <span className={styles.name}>{host.validName}</span>
                        <span className={styles.aboutMe}>
                            Member since: <i><DateFormatter date={hostMemberSince} showTime={false}/></i>
                        </span>
                        {/*<span className={styles.aboutMe}>{host.about_me}</span>*/}
                    </div>

                    <div className={styles.bottomBottom}>
                        <div>
                            {/* TODO: Implement response time */}
                            {/*<span><b>Response rate: </b></span>*/}
                            {/*<span><i>Within a day</i></span>*/}
                            <span>Send me a message:</span>
                        </div>

                        <ChatRoomNavigationButton chatRoom={chatRoom} className={styles.button}>
                            Contact Me
                        </ChatRoomNavigationButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHostCard;