import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";

import {resetPasswordConfirm} from "../../../actions/auth";

import "../Authentication.css";

const ResetPasswordConfirmPage = ({props, reset_password_confirm}) => {
    useEffect(() => {
        document.title = "Change Password";
    }, []);

    const {uid} = useParams();
    const {token} = useParams();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: ""
    })
    const {new_password, re_new_password} = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onSubmit = (event) => {
        event.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <div className="page-container flex-horizontally-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Change your Password</h1>
                        <h2>Please enter your new password</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="password" name="new_password" value={new_password} required={true} minLength={8} placeholder="New Password" onChange={onChange}/>
                        <input type="password" name="re_new_password" value={re_new_password} required={true} minLength={8} placeholder="Confirm New Password"
                               onChange={onChange}/>
                        <button type="submit" className="authentication-input">Change Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default connect(null, {reset_password_confirm: resetPasswordConfirm})(ResetPasswordConfirmPage);