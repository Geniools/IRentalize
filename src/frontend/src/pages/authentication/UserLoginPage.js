import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import InputField from "../../components/InputField";
import Header from "../../components/Header";
import {connect} from "react-redux";
import {login} from "../../actions/auth";

const UserLoginPage = ({isAuthenticated, login}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const {email, password, rememberMe} = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    // Handle the form submission
    const onSubmit = (event) => {
        event.preventDefault();
        login(email, password, rememberMe);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return (
            <Navigate to={"/"}/>
        )
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome back &#128075;</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
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
                            minLength={8}
                            placeholder="Password"
                            onChange={onChange}
                        />

                        <div className="authentication-field-info">
                            <InputField
                                order="input-first"
                                type="checkbox"
                                label="Remember me"
                                name="remember-me"
                                id="remember-me"
                                checked={rememberMe}
                                required={false}
                                onChange={onChange}
                            />
                            <Link to={"/account/password-reset/"}>Forgot Password</Link>
                        </div>

                        <button
                            className="authentication-input"
                            type="submit">
                            LOG IN
                        </button>
                    </form>

                    <div>
                        <p>
                            Don't have an account?
                            <Link to={"/account/register/"}>Sign Up</Link>
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