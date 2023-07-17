import React, {useState} from 'react';
import {connect} from "react-redux";
import {reset_password_confirm} from "../../actions/auth";
import InputField from "../../components/InputField";
import {Navigate, useParams} from "react-router-dom";

const ResetPasswordConfirmPage = ({props, reset_password_confirm}) => {
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
            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Reset Password</h1>
                        <h2>Please enter your new password</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <InputField
                            label=""
                            type="password"
                            name="new_password"
                            value={new_password}
                            required={true}
                            minLength={8}
                            placeholder="New Password"
                            onChange={onChange}
                        />

                        <InputField
                            label=""
                            type="password"
                            name="re_new_password"
                            value={re_new_password}
                            required={true}
                            minLength={8}
                            placeholder="Confirm New Password"
                            onChange={onChange}
                        />

                        <button type="submit" className="authentication-input">Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default connect(null, {reset_password_confirm})(ResetPasswordConfirmPage);