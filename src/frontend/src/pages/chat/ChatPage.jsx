import React, {useEffect, useState} from "react"
import {Navigate, useNavigate, useParams} from "react-router-dom"

import {connect} from "react-redux"
import {setNavigateToAfterAuth} from "../../actions/common"

import Header from "../../components/Header.tsx"
import Footer from "../../components/Footer/Footer"
import HeadTitle from "../../components/HeadTitle.tsx"
import ChatRoomList from "./partials/ChatRoomList/ChatRoomList"
import ChatMessages from "./partials/ChatMessages/ChatMessages"
import ChatSwitchButtons from "./partials/ChatSwitchButtons/ChatSwitchButtons"

import styles from "./ChatPage.module.css"

const ChatPage = ({isAuthenticated, setNavigateToAfterAuth, chatType}) => {
    if (!isAuthenticated) {
        // Set the navigateToAfterAuth state to the current page
        setNavigateToAfterAuth("/chat/")
        // Redirect to the login page
        return <Navigate to="/login"/>
    }

    useEffect(() => {
        document.title = "Chat"
    }, [])

    const [socket, setSocket] = useState(null)
    const {roomId} = useParams()
    const navigator = useNavigate()

    useEffect(() => {
        if (!roomId) {
            return
        }

        const token = localStorage.getItem("access") || sessionStorage.getItem("access")
        // Set up the WebSocket connection
        const newSocket = new WebSocket(
            'ws://' +
            window.location.host +
            '/ws/chat/' +
            roomId +
            '/?token=' +
            token,
        )

        newSocket.onopen = () => {
            console.log("WebSocket connection established.")
        }

        newSocket.onclose = () => {
            console.log("WebSocket connection closed.")
            setSocket(null)
            // Redirect to the chat page without a room ID
            return navigator(`/chat/${chatType}/`)
        }

        setSocket(newSocket)

        // Unsubscribe from the channel when the component unmounts
        return () => {
            newSocket.close()
        }
    }, [roomId])

    return (
        <>
            <Header/>

            <div className="page-container">
                <HeadTitle title={`Chat`}/>

                <ChatSwitchButtons/>

                <div className={styles.chatContainer}>
                    <ChatRoomList chatType={chatType}/>
                    <ChatMessages socket={socket} chatType={chatType} roomId={roomId}/>
                </div>
            </div>

            <Footer/>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {setNavigateToAfterAuth})(ChatPage)