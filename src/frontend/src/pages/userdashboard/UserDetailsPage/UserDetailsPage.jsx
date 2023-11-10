import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

import {updateUserInfo} from "../../../actions/user";

import {EMAIL_RESET_URL, PASSWORD_RESET_URL} from "../../../URL_PATHS";

import Loader from "../../../components/Loader/Loader";
import HeadTitle from "../../../components/HeadTitle/HeadTitle";
import HeadSubTitle from "../../../components/HeadSubTitle/HeadSubTitle";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import GoogleMapContainer from "../../../components/GoogleMapContainer/GoogleMapContainer";

import "../Userdashboard.css";
import "./UserDetailsPage.css";

const UserDetailsPage = ({user, updateUserInfo}) => {
    // Display a loader if the user is not loaded yet
    if (!user) {
        return <Loader/>;
    }

    useEffect(() => {
        // Set the form data
        setFormData({
            // User's details
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            // User's profile details
            about_me: user.profile?.about_me,
            phone: user.profile?.phone,
            // Address details
            street_name: user.profile.default_address?.street_name,
            house_number: user.profile.default_address?.house_number,
            house_addition: user.profile.default_address?.house_addition,
            zip_code: user.profile.default_address?.zip_code,
        })
    }, [user]);

    // Updating the user's details
    const [formData, setFormData] = useState({
        // User's details
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        // User's profile details
        about_me: '',
        phone: '',
        // Address details
        street_name: '',
        house_number: '',
        house_addition: '',
        zip_code: '',
    });

    const {
        username, first_name, last_name, email,
        about_me, phone,
        street_name, house_number, house_addition, zip_code
    } = formData;

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    // ================================================================================

    // Handle the form submission for the details
    const onSubmitDetails = async (event) => {
        event.preventDefault();
        updateUserInfo(formData);
    }

    return (
        <>
            <div className="dashboard-right-panel-content">
                <HeadTitle title="My Details" capitalize={true}/>

                <form onSubmit={onSubmitDetails}>
                    <HeadSubTitle title="Profile"/>

                    <label htmlFor="username">Username:</label>
                    <input onChange={onChange} type="text" id="username" name="username" placeholder="Username" value={username}/>

                    <div className="dashboard-right-panel-content-line">
                        <div>
                            <label htmlFor="first_name">First name:</label>
                            <input onChange={onChange} type="text" id="first_name" name="first_name" placeholder="Your first name" value={first_name}/>
                        </div>

                        <div>
                            <label htmlFor="last_name">Last name:</label>
                            <input onChange={onChange} type="text" id="last_name" name="last_name" placeholder="Your last name" value={last_name}/>
                        </div>
                    </div>

                    <label htmlFor="phone">Phone:</label>
                    <input onChange={onChange} type="tel" id="phone" name="phone" placeholder="Phone" value={phone}/>

                    <label htmlFor="about_me">About me:</label>
                    <textarea onChange={onChange} id="about_me" name="about_me" placeholder="What would you like others to know about you?" value={about_me}/>

                    <HeadSubTitle title="Default Address"/>

                    <div className="dashboard-right-panel-content-line">
                        <div>
                            <label htmlFor="street_name">Street name:</label>
                            <input onChange={onChange} type="text" id="street_name" name="street_name" placeholder="Street name" value={street_name}/>
                        </div>

                        <div>
                            <label htmlFor="zip_code">Zip code:</label>
                            <input onChange={onChange} type="text" id="zip_code" name="zip_code" placeholder="Zip code" value={zip_code}/>
                        </div>
                    </div>

                    <div className="dashboard-right-panel-content-line">
                        <div>
                            <label htmlFor="house_number">House number:</label>
                            <input onChange={onChange} type="text" id="house_number" name="house_number" placeholder="House number" value={house_number}/>
                        </div>

                        <div>
                            <label htmlFor="house_addition">House addition:</label>
                            <input onChange={onChange} type="text" id="house_addition" name="house_addition" placeholder="House addition" value={house_addition}/>
                        </div>
                    </div>

                    {
                        user.profile.default_address && (
                            <GoogleMapContainer latitude={user.profile.default_address.latitude} longitude={user.profile.default_address.longitude}/>
                        )
                    }

                    <button type="submit">Update Details</button>
                </form>

                <hr/>

                <HeadTitle title="Login Credentials" capitalize={true}/>

                <form onSubmit="">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={email} readOnly={true}/>
                </form>

                <i>To change your email use <u><b><a href={EMAIL_RESET_URL}>this</a></b></u> link.</i>
                <i>To change your password use <u><b><a href={PASSWORD_RESET_URL}>this</a></b></u> link.</i>

                <hr/>

                <HeadTitle title="Security Information" capitalize={true}/>

                <div className="dashboard-right-panel-content-readinfo">
                    <p><i>Date joined:</i> <b><DateFormatter date={user.last_login}/></b></p>
                    <p><i>Last login:</i> <b><DateFormatter date={user.date_joined}/></b></p>
                </div>

                <hr/>

                <HeadTitle title="Host Statistics" capitalize={true}/>

                <div className="dashboard-right-panel-content-readinfo">
                    <p><i>Your response rate:</i> <b>{user.profile?.response_rate ? user.profile?.response_rate : "No information"}</b></p>
                    <p><i>Your response time:</i> <b>{user.profile?.response_time ? user.profile?.response_time : "No information"}</b></p>
                </div>

                <hr/>
            </div>
        </>
    )
}


const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {updateUserInfo})(UserDetailsPage);