import React, {createRef, useEffect, useState} from "react";

import axiosInstanceJSONAPI from "../../../../utils/axios/axios_content_type_json";

import DateFormatter from "../../../../components/DateFormatter/DateFormatter";
import Loader from "../../../../components/Loader/Loader";

import styles from "./ChatMessages.module.css";

const ChatMessages = ({socket, chatType}) => {
    if (!socket) {
        return (
            <div className={styles.chatBox}></div>
        )
    }

    const [messages, setMessages] = useState([]);
    const chatBoxRef = createRef();

    useEffect(() => {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the chat box
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        // TODO: Filter the messages based on room ID

        let api_url = "";
        switch (chatType) {
            case "host":
                api_url = '/api/chat/messages/host/';
                break;
            case "guest":
                api_url = '/api/chat/messages/guest/';
                break;
            default:
                setMessages([]);
                return;
        }

        axiosInstanceJSONAPI.get(api_url)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    }, [chatType]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const messageObject = {
            message: e.target["message"].value,
        };

        socket.send(JSON.stringify(messageObject));
        // Clear the message input
        e.target["message"].value = "";
    }

    if (!messages) {
        return (
            <div className={styles.chatBox}>
                <Loader/>
            </div>
        )
    }

    return (
        <>
            <ul ref={chatBoxRef} className={styles.chatBox}>
                {
                    // TODO: Style the message to be right/left aligned based on the sender
                    messages?.map((entry) => (
                        <li key={entry.id} className={styles.message}>
                            <h3>{entry.sender_name}</h3>
                            <p>{entry.message}</p>
                            <p><DateFormatter date={entry.timestamp}/></p>
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={handleSubmit} className={styles.chatForm}>
                <input type="text" name="message" id="message" placeholder="Send a message..."/>
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default ChatMessages;