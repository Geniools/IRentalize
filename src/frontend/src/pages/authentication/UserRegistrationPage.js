import React, {useState} from "react";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {logout, signup} from "../../actions/auth";

const UserRegistrationPage = ({signup, logout, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber
    } = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onSubmit = (event) => {
        event.preventDefault();
        signup(firstName, lastName, username, email, password, phoneNumber);
        setAccountCreated(true);
    }

    if (accountCreated) {
        return <Navigate to={"/account/login/"}/>
    }

    if (isAuthenticated) {
        return (
            <>
                <Header showLinks={false} showSearch={false} showAuth={false}/>

                <div className="page-container">
                    <div className="authentication-form">
                        <div className="authentication-header">
                            <h1>You are logged in</h1>
                            <h2>Go to your <Link to={"/account/"}>Dashboard</Link> OR</h2>
                        </div>

                        <button
                            type={"submit"}
                            className={"authentication-input"}
                            onClick={logout}
                        >
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

            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome to IRentalize</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <InputField
                            label=""
                            type="text"
                            name="firstName"
                            value={firstName}
                            required={true}
                            placeholder="First Name"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="lastName"
                            value={lastName}
                            required={true}
                            placeholder="Last Name"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="username"
                            value={username}
                            required={true}
                            placeholder="Username"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="email"
                            name="email"
                            value={email}
                            required={true}
                            placeholder="Email"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="password"
                            name="password"
                            value={password}
                            required={true}
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            required={true}
                            placeholder="Phone Number"
                            onChange={onChange}
                        />

                        <button
                            className="authentication-input"
                            type="submit">
                            Register
                        </button>
                    </form>

                    <div>
                        <p>
                            Don't have an account?
                            <Link to={"/account/login/"}>Sign In</Link>
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