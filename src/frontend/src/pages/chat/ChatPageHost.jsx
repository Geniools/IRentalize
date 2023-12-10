import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import axiosInstanceJSONAPI from "../../utils/axios/axios_content_type_json";

import HeadTitle from "../../components/HeadTitle/HeadTitle";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./ChatPage.module.css";

const ChatPageHost = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const {listingId} = useParams();
    useEffect(() => {
        axiosInstanceJSONAPI.get('/api/chat/messages/')
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error);
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("access") || sessionStorage.getItem("access");
        // Set up the WebSocket connection
        const newSocket = new WebSocket(
            'ws://' +
            window.location.host +
            '/ws/chat/' +
            listingId +
            '/?token=' +
            token
        );

        newSocket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        newSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        newSocket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        setSocket(newSocket);
        // Unsubscribe from the channel when the component unmounts
        return () => {
            newSocket.close();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const messageObject = {
            message: e.target["message"].value,
        };

        socket.send(JSON.stringify(messageObject));
    }

    return (
        <>
            <Header/>

            <div className="page-container">
                <div>
                    <Link to={'/chat/host/'}>Host</Link>
                    <Link to={'/chat/guest/'}>Guest</Link>
                </div>

                <HeadTitle title={`Chat: ${listingId}`}/>

                <div className={styles.chatContainer}>
                    <div className={styles.chatUserList}>
                        <ul>
                            {
                                // TODO: Get the list of users from the server
                            }
                            <li>User 1</li>
                            <li>User 2</li>
                            <li>User 3</li>
                        </ul>
                    </div>

                    <div className={styles.chatBox}>
                        {
                            messages?.map((entry) => (
                                <div key={entry.id} className={styles.message}>
                                    <h3>{entry.sender_name}</h3>
                                    <p>{entry.message}</p>
                                </div>
                            ))
                        }
                    </div>

                    <form onSubmit={handleSubmit} className={styles.chatForm}>
                        <input type="text" name="message" id="message" placeholder="Send a message..."/>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default ChatPageHost;