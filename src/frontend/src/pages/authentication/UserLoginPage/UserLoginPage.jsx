import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Link, Navigate} from 'react-router-dom';

import Header from "../../../components/Header/Header";
import {login} from "../../../actions/auth";

import {ACCOUNT_URL, PASSWORD_RESET_URL, SIGNUP_URL} from "../../../URL_PATHS";

import "../Authentication.css";

const UserLoginPage = ({isAuthenticated, login}) => {
    useEffect(() => {
        document.title = "Login";
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const {email, password, rememberMe} = formData;
    const onChange = event => {
        if (event.target.name === "rememberMe") {
            setFormData({...formData, [event.target.name]: event.target.checked})
            return;
        }
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    // Handle the form submission
    const onSubmit = async (event) => {
        event.preventDefault();
        login(email, password, rememberMe);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return (
            <Navigate to={ACCOUNT_URL}/>
        )
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container flex-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome back &#128075;</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="email" name="email" value={email} required={true} placeholder="Email" onChange={onChange}/>
                        <input type="password" name="password" value={password} required={true} minLength={8} placeholder="Password" onChange={onChange}/>

                        <div className="authentication-field-info">
                            <input id="rememberMe" type="checkbox" name="rememberMe" checked={rememberMe} required={false} onChange={onChange}/>
                            <label htmlFor="rememberMe">Remember me</label>

                            <Link to={PASSWORD_RESET_URL}>Forgot Password</Link>
                        </div>

                        <button className="authentication-input" type="submit">
                            LOG IN
                        </button>
                    </form>

                    <div>
                        <p>
                            Don't have an account?
                            <Link to={SIGNUP_URL}>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(UserLoginPage);