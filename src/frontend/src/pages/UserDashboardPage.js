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

    return (
        <>
            <Header showLogout={true}/>

            <div className={"page-container"}>
                <div className="contact-us-header">
                    <h1>Host Dashboard</h1>
                    <p>Host Dashboard</p>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(UserDashboardPage);