import React from "react";

import {NavLink} from "react-router-dom";

import styles from "./ChatSwitchButtons.module.css";

const ChatSwitchButtons = () => {
    return (
        <>
            <div className={styles.chatSwitchButtonsContainer}>
                <p>Select the chat you wish to view:</p>

                <div className={styles.chatSwitchButtons}>
                    <NavLink
                        className={
                            ({isActive}) =>
                                isActive ? `${styles.chatLink} ${styles.chatLinkActive}` : `${styles.chatLink}`
                        }
                        to={"/chat/host/"}>
                        Host Chat
                    </NavLink>

                    <NavLink
                        className={
                            ({isActive}) =>
                                isActive ? `${styles.chatLink} ${styles.chatLinkActive}` : `${styles.chatLink}`
                        }
                        to={"/chat/guest/"}>
                        Guest Chat
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default ChatSwitchButtons;