import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";

import Header from "../../../components/Header/Header";
import {logout, signup} from "../../../actions/auth";

import {ACCOUNT_URL, LOGIN_URL} from "../../../URL_PATHS";

import "../Authentication.css";

const UserRegistrationPage = ({signup, logout, isAuthenticated}) => {
    useEffect(() => {
        document.title = "Sign Up";
    }, []);

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const {
        firstName,
        lastName,
        email,
        password,
    } = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onSubmit = (event) => {
        event.preventDefault();
        signup(firstName, lastName, email, password);
        setAccountCreated(true);
    }

    if (accountCreated) {
        return <Navigate to={LOGIN_URL}/>
    }

    if (isAuthenticated) {
        return (
            <>
                <Header showLinks={false} showSearch={false} showAuth={false}/>

                <div className="page-container">
                    <div className="authentication-form">
                        <div className="authentication-header">
                            <h1>You are logged in</h1>
                            <h2>Go to your <Link to={ACCOUNT_URL}>Dashboard</Link> OR</h2>
                        </div>

                        <button type={"submit"} className={"authentication-input"} onClick={logout}>
                            LOG OUT
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container flex-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome to IRentalize</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="text" name="firstName" value={firstName} required placeholder="First Name" onChange={onChange}/>
                        <input type="text" name="lastName" value={lastName} required placeholder="Last Name" onChange={onChange}/>
                        <input type="email" name="email" value={email} required placeholder="Email" onChange={onChange}/>
                        <input type="password" name="password" value={password} required placeholder="Password" onChange={onChange}/>

                        <button className="authentication-input" type="submit">
                            Register
                        </button>
                    </form>

                    <div>
                        <p>
                            Already have an account?
                            <Link to={LOGIN_URL}>Sign In</Link>
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

export default connect(mapStateToProps, {signup, logout})(UserRegistrationPage);