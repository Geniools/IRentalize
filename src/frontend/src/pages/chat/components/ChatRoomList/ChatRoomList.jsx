import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

import axiosInstanceJSONAPI from "../../../../services/axios/axios_content_type_json";

import styles from "./ChatRoomList.module.css";

const ChatRoomList = ({chatType}) => {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        let api_url = "";
        switch (chatType) {
            case "host":
                api_url = '/api/chat/rooms/host/';
                break;
            case "guest":
                api_url = '/api/chat/rooms/guest/';
                break;
            default:
                setRooms([]);
                return;
        }

        axiosInstanceJSONAPI.get(api_url)
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    }, [chatType])

    console.log(rooms);

    return (
        <>
            <div className={styles.chatRoomsList}>
                <ul>
                    {
                        rooms?.map((entry) => (
                            <NavLink
                                className={
                                    ({isActive}) =>
                                        isActive ? `${styles.chatRoomLinkActive} ${styles.chatRoomLink}` : `${styles.chatRoomLink}`
                                }
                                to={`/chat/${chatType}/${entry.id}/`}>

                                <li key={entry.id}>
                                    <p>{entry.listing_title}</p>
                                    <p>Chat with: {entry.listing_host_name}</p>
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default ChatRoomList;