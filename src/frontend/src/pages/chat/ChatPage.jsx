import React, {useEffect, useState} from "react";

import HeadTitle from "../../components/HeadTitle/HeadTitle";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./ChatPage.module.css";
import {useParams} from "react-router-dom";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const {roomName} = useParams();
    useEffect(() => {
        // Set up the WebSocket connection
        const new_socket = new WebSocket(
            'ws://' +
            window.location.host +
            '/ws/chat/' +
            roomName +
            '/'
        );

        // Listen for messages
        new_socket.addEventListener('message', (e) => {
            const message = JSON.parse(e.data);
            setMessages([...messages, message]);
        });

        setSocket(new_socket);
        // Unsubscribe from the channel when the component unmounts
        return () => {
            socket.close();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target["message"].value);
        
        socket.send(JSON.stringify({
            'message': e.target["message"].value
        }));
    }

    return (
        <>
            <Header/>

            <div className="page-container">
                <HeadTitle title={`Chat Space: ${roomName}`}/>

                <div className={styles.chatBox}>
                    {
                        // TODO: Add messages
                        messages?.map((message, index) => (
                            <div key={index} className={styles.message}>
                                <p>{message.message}</p>
                            </div>
                        ))
                    }
                </div>

                <form onSubmit={handleSubmit} className={styles.chatForm}>
                    <input type="text" name="message" id="message" placeholder="Send a message..."/>
                    <button type="submit">Send</button>
                </form>
            </div>

            <Footer/>
        </>
    );
}

export default ChatPage;