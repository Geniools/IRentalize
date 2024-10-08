import React, {useEffect, useState} from 'react'
import {Navigate} from "react-router-dom"
import {connect} from "react-redux"

import {resetPassword} from "../../../actions/auth"
import Header from "../../../components/Header.tsx"

import "../Authentication.css"

const ResetPasswordPage = ({reset_password}) => {
    useEffect(() => {
        document.title = "Change Password"
    }, [])

    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
    })

    const {email} = formData

    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})

    const onSubmit = (event) => {
        event.preventDefault()

        reset_password(email)
        setRequestSent(true)
    }

    if (requestSent) {
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container flex-horizontally-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Change your Password</h1>
                        <h2>Please enter your email address</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="email" name="email" value={email} required={true} placeholder="Email"
                               onChange={onChange}/>
                        <button type="submit" className="authentication-input">Send Change Password Link</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default connect(null, {reset_password: resetPassword})(ResetPasswordPage)