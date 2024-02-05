import React from 'react';

import HeadSubTitle from "../../../../../components/ui/HeadSubTitle/HeadSubTitle";
import ChatRoomNavigationButton from "../../../../../components/ChatRoomNavigationButton/ChatRoomNavigationButton";

import styles from "./BookingDisabledSection.module.css";

const BookingDisabledSection = ({hostEmail, chatRoom}) => {
    return (
        <>
            <HeadSubTitle title={"Interested? Contact the host!"}/>

            <div className={`${styles.container}`}>
                <p>
                    You can contact the host by e-mail at <b><a href={`mailto:${hostEmail}`}>{hostEmail}</a></b>
                </p>

                <p>
                    You can also send him a message using the <ChatRoomNavigationButton chatRoom={chatRoom}>CHAT</ChatRoomNavigationButton>
                </p>
            </div>
        </>
    )
}

export default BookingDisabledSection;