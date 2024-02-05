import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {setNavigateToAfterAuth} from "../../actions/common";

const ChatRoomNavigationButton = ({children, className, chatRoom}) => {
    // Get the isAuthenticated state from the store
    const {isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
    }))
    const dispatch = useDispatch();

    const navigator = useNavigate();

    const {
        createChatRoomHandler,
        isPending,
        chatRoomId,
        listingId
    } = chatRoom;

    useEffect(() => {
        // Navigate to the chat room if the chat room id is available
        if (chatRoomId) {
            navigator(`/chat/guest/${chatRoomId}/`);
        }
    }, [chatRoomId]);

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
        <button className={className} onClick={handleClicked} disabled={isPending}>
            {children}
        </button>
    )
}

export default ChatRoomNavigationButton;