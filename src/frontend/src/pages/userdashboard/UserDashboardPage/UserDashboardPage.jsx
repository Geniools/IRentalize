import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link, Navigate, NavLink, Route, Routes, useNavigate} from "react-router-dom";

import Loader from "../../../components/Loader/Loader";
import Header from "../../../components/Header/Header";
import UserDetailsPage from "./../UserDetailsPage/UserDetailsPage";
import UserOrdersPage from "./../UserOrdersPage/UserOrdersPage";
import UserPostsPage from "./../UserPostsPage/UserPostsPage";
import UserRecentlyViewedPage from "./../UserRecentlyViewedPage/UserRecentlyViewedPage";
import UserPostDetailsPage from "./../UserPostDetailsPage/UserPostDetailsPage";
import UserChangeProfilePicture from "../UserChangeProfilePicture/UserChangeProfilePicture";

import {ACCOUNT_URL, LOGIN_URL, USER_CHANGE_PROFILE_PICTURE_URL, USER_DETAILS_URL, USER_ORDERS_URL, USER_POSTS_URL, USER_RECENTLY_VIEWED_URL} from "../../../URL_PATHS";

import "../Userdashboard.css";

const UserDashboardPage = ({isAuthenticated, user}) => {
    if (!isAuthenticated) {
        return <Navigate to={LOGIN_URL}/>;
    }

    if (!user) {
        return <Loader/>;
    }

    useEffect(() => {
        document.title = "Host Dashboard";
    }, []);
    const navigate = useNavigate();

    return (
        <>
            <Header showLogout={true} showLinks={false}/>

            <div className="page-container">
                <div className={"dashboard-left-panel-background"}></div>

                <div className="dashboard-container">
                    <div className="dashboard-left-panel">
                        <div className="dashboard-left-panel-header">
                            <div className="dashboard-left-panel-image-container" onClick={() => navigate(USER_CHANGE_PROFILE_PICTURE_URL)}>
                                <img src={user.profile?.profile_picture ? user.profile?.profile_picture : "/static/assets/default_avatar_male.png"} alt="Avatar"/>
                                <div className="image-edit-text">Edit</div>
                            </div>
                            <li><Link to={ACCOUNT_URL}><h1>{user.first_name}</h1></Link></li>
                        </div>

                        <ul className="dashboard-nav-bar">
                            <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={USER_DETAILS_URL}>My Details</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={USER_ORDERS_URL}>My Orders</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={USER_POSTS_URL}>My Posts</NavLink></li>
                            <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={USER_RECENTLY_VIEWED_URL}>Recently Viewed</NavLink></li>
                        </ul>
                    </div>

                    <div className="dashboard-right-panel">
                        <Routes>
                            <Route exact path='/user-details' element={<UserDetailsPage/>}/>
                            <Route exact path='/user-orders' element={<UserOrdersPage/>}/>
                            <Route exact path='/user-posts' element={<UserPostsPage/>}/>
                            <Route exact path='/user-posts/:id' element={<UserPostDetailsPage/>}/>
                            <Route exact path='/user-recently-viewed' element={<UserRecentlyViewedPage/>}/>
                            <Route exact path='/change-profile-picture' element={<UserChangeProfilePicture/>}/>
                        </Routes>
                    </div>
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