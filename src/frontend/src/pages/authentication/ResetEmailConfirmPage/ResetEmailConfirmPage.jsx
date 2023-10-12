import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {connect} from "react-redux";

import {resetEmailConfirm} from "../../../actions/auth";
import Header from "../../../components/Header/Header";

import "../Authentication.css";

const ResetEmailConfirmPage = ({resetEmailConfirm}) => {
    useEffect(() => {
        document.title = "Change Email";
    }, []);

    const {uid} = useParams();
    const {token} = useParams();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_email: "",
        re_new_email: ""
    })
    const {new_email, re_new_email} = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    const onSubmit = (event) => {
        event.preventDefault();

        resetEmailConfirm(uid, token, new_email, re_new_email);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container flex-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Change your Email</h1>
                        <h2>Please enter your new email</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="email" name="new_email" value={new_email} required={true} minLength={8} placeholder="New Email" onChange={onChange}/>
                        <input type="text" name="re_new_email" value={re_new_email} required={true} minLength={8} placeholder="Confirm New Email" onChange={onChange}/>
                        
                        <button type="submit" className="authentication-input">Change your email</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default connect(null, {resetEmailConfirm})(ResetEmailConfirmPage);