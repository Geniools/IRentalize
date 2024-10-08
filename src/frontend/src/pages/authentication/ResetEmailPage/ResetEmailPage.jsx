import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Navigate} from "react-router-dom"

import {resetEmail} from "../../../actions/auth"
import Header from "../../../components/Header.tsx"

import "../Authentication.css"

const ResetEmailPage = ({resetEmail}) => {
    useEffect(() => {
        document.title = "Change Email"
    }, [])

    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
    })

    const {email} = formData

    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})

    const onSubmit = (event) => {
        event.preventDefault()

        resetEmail(email)
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
                        <h1>Change your Email</h1>
                        <h2>Please enter your current email address</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="email" name="email" value={email} required={true} placeholder="Email"
                               onChange={onChange}/>
                        <button type="submit" className="authentication-input">Send Email Change Link</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default connect(null, {resetEmail})(ResetEmailPage)