import React, {useEffect, useState} from 'react';
import {EMAIL_RESET_URL, PASSWORD_RESET_URL} from "../../UrlPaths";
import {updateUserInfo} from "../../actions/auth";
import {connect} from "react-redux";

const UserDetailsPage = ({user, updateUserInfo}) => {
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            })
            setRender(!render);
        }
    }, [user]);

    // Form data for updating the user's details
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [render, setRender] = useState(false);

    const {username, first_name, last_name, email, address, phone} = formData;
    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // Handle the form submission
    const onSubmitDetails = async (event) => {
        event.preventDefault();
        updateUserInfo(username, first_name, last_name, address, phone);
    }

    if (user) {
        // Format the date - Example: "Aug 30, 2023, 02:11 PM"
        const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}
        // Save the formatted dates to variables
        const userLastLogin = new Date(user.last_login).toLocaleString('en-US', dateOptions);
        const userDateJoined = new Date(user.date_joined).toLocaleString('en-US', dateOptions);
        return (
            <>
                <div className="dashboard-right-panel-header">
                    <h1>MY DETAILS</h1>
                </div>

                <div className="dashboard-right-panel-content">
                    <form onSubmit={onSubmitDetails}>
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

                        <label htmlFor="address">Address:</label>
                        <input onChange={onChange} type="text" id="address" name="address" placeholder="Address" value={address}/>

                        <label htmlFor="phone">Phone:</label>
                        <input onChange={onChange} type="tel" id="phone" name="phone" placeholder="Phone" value={phone}/>

                        <button type="submit">Update Details</button>
                    </form>

                    <hr/>

                    <div className="dashboard-right-panel-header">
                        <h1>LOGIN CREDENTIALS</h1>
                    </div>

                    <form onSubmit="">
                        <label htmlFor="email">Email:</label>
                        <input onChange={onChange} type="email" id="email" name="email" placeholder="Email" value={email} readOnly={true}/>
                    </form>

                    <i>To change your email use <u><b><a href={EMAIL_RESET_URL}>this</a></b></u> link.</i>
                    <i>To change your password use <u><b><a href={PASSWORD_RESET_URL}>this</a></b></u> link.</i>

                    <hr/>

                    <div className="dashboard-right-panel-header">
                        <h1>SECURITY INFORMATION</h1>
                    </div>

                    <div className="dashboard-right-panel-content-readinfo">
                        <p><i>Date joined:</i> <b>{userDateJoined}</b></p>
                        <p><i>Last login:</i> <b>{userLastLogin}</b></p>
                    </div>
                </div>
            </>
        )
    } else {
        // Display a loading screen if the user is not loaded yet
        return (
            <>
                <div className="dashboard-right-panel-header">
                    <h1>LOADING...</h1>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {updateUserInfo})(UserDetailsPage);