import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "../../components/Header";
import {Navigate} from "react-router-dom";
import {LOGIN_URL} from "../../UrlPaths";

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
                <div className={"dashboard-left-panel-background"}></div>

                <Header showLogout={true} showLinks={false}/>

                <div className="page-container">
                    <div className="dashboard-container">
                        <div className="dashboard-left-panel">
                            <div className="dashboard-left-panel-header">
                                <img src="" alt="Avatar"/>
                                <a href=""><h1>{user.first_name}</h1></a>
                            </div>
                            <ul className="dashboard-nav-bar">
                                <li><a href="">My Details</a></li>
                                <li><a href="">My Orders</a></li>
                                <li><a href="">My Posts</a></li>
                                <li><a href="">Order Details</a></li>
                                <li><a href="">Recently Viewed</a></li>
                            </ul>
                        </div>

                        <div className="dashboard-right-panel">
                            <div className="dashboard-right-panel-header">
                                <h1>MY DETAILS</h1>
                            </div>

                            <div className="dashboard-right-panel-content">
                                <form>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" id="username" name="username" placeholder="Username" value={user.username ? user.username : ''}/>

                                    <div className="dashboard-right-panel-content-line">
                                        <div>
                                            <label htmlFor="first_name">First name:</label>
                                            <input type="text" id="first_name" name="first_name" placeholder="Your first name"
                                                   value={user.first_name ? user.first_name : ''}/>
                                        </div>

                                        <div>
                                            <label htmlFor="last_name">Last name:</label>
                                            <input type="text" id="last_name" name="last_name" placeholder="Your last name" value={user.last_name ? user.last_name : ''}/>
                                        </div>
                                    </div>

                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" placeholder="Email" value={user.email ? user.email : ''}/>

                                    <label htmlFor="address">Address:</label>
                                    <input type="text" id="address" name="address" placeholder="Address" value={user.address ? user.address : ''}/>

                                    <label htmlFor="phone">Phone:</label>
                                    <input type="tel" id="phone" name="phone" placeholder="Phone" value={user.phone ? user.phone : ''}/>

                                    <button type="submit">Update</button>
                                </form>

                                <p>Last login: {user.last_login ? user.last_login : "None"}</p>
                                <p>Date joined: {user.date_joined ? user.date_joined : "None"}</p>
                            </div>
                        </div>
                    </div>
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