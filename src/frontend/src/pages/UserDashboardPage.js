import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "../components/Header";
import {Navigate} from "react-router-dom";
import {LOGIN_URL} from "../UrlPaths";

const UserDashboardPage = ({isAuthenticated, user}) => {
    useEffect(() => {
        document.title = "Host Dashboard";
    }, []);
    
    if (!isAuthenticated) {
        return (
            <Navigate to={LOGIN_URL}/>
        )
    }

    if (user) {
        return (
            <>
                <Header showLogout={true}/>

                <div className={"page-container"}>
                    <div className="contact-us-header">
                        <h1>Host Dashboard</h1>
                        <p>Host Dashboard</p>
                    </div>

                    <ul>
                        <li>Username: {user.username ? user.username : "None"}</li>
                        <li>First name: {user.first_name ? user.first_name : "None"}</li>
                        <li>Last name: {user.last_name ? user.last_name : "None"}</li>
                        <li>Email: {user.email ? user.email : "None"}</li>
                        <li>Address: {user.address ? user.address : "None"}</li>
                        <li>Phone: {user.phone ? user.phone : "None"}</li>
                        <li>Last login: {user.last_login ? user.last_login : "None"}</li>
                        <li>Date joined: {user.date_joined ? user.date_joined : "None"}</li>
                    </ul>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Header showLogout={true}/>

                <div className={"page-container"}>
                    <div className="contact-us-header">
                        <h1>Host Dashboard</h1>
                        <p>Host Dashboard</p>
                    </div>

                    <p>Loading...</p>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(UserDashboardPage);