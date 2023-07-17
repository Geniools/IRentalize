import React, {useState} from 'react';
import {reset_password} from "../../actions/auth";
import {Navigate} from "react-router-dom";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import {connect} from "react-redux";

const ResetPasswordPage = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    });

    const {email} = formData;

    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onSubmit = (event) => {
        event.preventDefault();

        reset_password(email);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Reset Password</h1>
                        <h2>Please enter your email address</h2>
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

                        <button type="submit" className="authentication-input">Send Reset Password Link</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default connect(null, {reset_password})(ResetPasswordPage);