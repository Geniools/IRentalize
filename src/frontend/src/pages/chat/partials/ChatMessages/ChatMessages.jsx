import React, {createRef, useEffect, useState} from "react"

import axiosInstanceJSONAPI from "../../../../services/axios/axios_content_type_json.ts"

import DateFormatter from "../../../../components/DateFormatter/DateFormatter.js"
import Loader from "../../../../components/Loader/Loader.js"

import styles from "./ChatMessages.module.css"

const ChatMessages = ({socket, chatType, roomId}) => {
    if (!socket || !roomId) {
        return (
            <div className={styles.chatBox}></div>
        )
    }

    const [messages, setMessages] = useState([])
    const chatBoxRef = createRef()

    useEffect(() => {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, message])
        }
    }, [])

    useEffect(() => {
        // Scroll to the bottom of the chat box
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        let api_url = ""
        switch (chatType) {
            case "host":
                api_url = '/api/chat/messages/host/?room_id=' + roomId
                break
            case "guest":
                api_url = '/api/chat/messages/guest/?room_id=' + roomId
                break
            default:
                setMessages([])
                return
        }

        axiosInstanceJSONAPI.get(api_url)
            .then((response) => {
                setMessages(response.data)
            })
            .catch((error) => {
                // TODO: Handle error
                console.log(error)
            })
    }, [chatType])

    const handleSubmit = (e) => {
        e.preventDefault()

        const messageObject = {
            message: e.target["message"].value,
            sender_type: chatType,
        }

        socket.send(JSON.stringify(messageObject))
        // Clear the message input
        e.target["message"].value = ""
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
                    messages?.map((entry) => (
                        <li
                            key={entry.id}
                            className={`
                                ${styles.message} 
                                ${entry.sender_type === chatType ? styles.message_right : styles.message_left}
                            `}>
                            <h3>{entry.sender_name}</h3>
                            <p>{entry.message}</p>
                            <i><p><DateFormatter date={entry.timestamp}/></p></i>
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

export default ChatMessages