import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {setNavigateToAfterAuth} from "../../actions/common";

import DateFormatter from "../DateFormatter/DateFormatter";

import styles from "./ProfileHostCard.module.css";

const ProfileHostCard = ({hostUsername, hostFirstName, hostImage, hostMemberSince, chatRoom}) => {
    // Get the isAuthenticated state from the store
    const {isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
    }))
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const host = {
        username: hostUsername,
        first_name: hostFirstName,
        image: hostImage ? hostImage : "/static/assets/default_avatar_male.png",
        validName: hostUsername ? hostUsername : hostFirstName,
    }

    const {
        createChatRoomHandler,
        isPending,
        isError,
        isSuccess,
        error,
        data,
        chatRoomId,
        listingId
    } = chatRoom;

    useEffect(() => {
        let errorMessage = null;
        let room_id = null;

        if (isSuccess) {
            room_id = data.data.chat_room_id;
        }

        if (isError) {
            room_id = error.response.data.chat_room_id;
            errorMessage = error.response.data.error;
        }

        if (room_id) {
            navigator(`/chat/guest/${room_id}/`);
        }

        if (errorMessage) {
            // TODO: Display error message
            console.log(errorMessage);
        }
    }, [isSuccess, isError]);

    const handleClicked = () => {
        // Check if the user is authenticated
        if (!isAuthenticated) {
            // Set the navigateToAfterLogin state to the current page
            dispatch(setNavigateToAfterAuth(`/listing/${listingId}/`))
                .then(r => {
                    // Redirect to login page if user is not logged in
                    return navigator("/login");
                });
        }

        createChatRoomHandler();
    }

    return (
        <>
            <div className={styles.card}>
                <button className={styles.mail} onClick={handleClicked} disabled={isPending}>
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

                        <button className={styles.button} onClick={handleClicked} disabled={isPending}>
                            Contact Me
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHostCard;