import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Link, Navigate} from 'react-router-dom'

import {login} from "../../../actions/auth"
import {setNavigateToAfterAuth} from "../../../actions/common"

import Header from "../../../components/Header.tsx"

import {ACCOUNT_URL, PASSWORD_RESET_URL, SIGNUP_URL} from "../../../utils/constants/URL_PATHS.ts"

import "../Authentication.css"

const UserLoginPage = ({isAuthenticated, navigateToAfterLogin, login, setNavigateToAfterAuth}) => {
    useEffect(() => {
        document.title = "Login"
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const {email, password, rememberMe} = formData
    const onChange = event => {
        if (event.target.name === "rememberMe") {
            setFormData({...formData, [event.target.name]: event.target.checked})
            return
        }
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // Handle the form submission
    const onSubmit = async (event) => {
        event.preventDefault()
        login(email, password, rememberMe)
    }

    // Redirect if logged in
    if (isAuthenticated) {
        // Check if the user is redirected from another page
        if (navigateToAfterLogin) {
            // Save the navigateToAfterLogin state to variable
            const navigateTo = navigateToAfterLogin
            // Reset the navigateToAfterLogin state
            setNavigateToAfterAuth(null)
            // Navigate to the page the user was redirected from
            return <Navigate to={navigateToAfterLogin}/>
        }

        return (
            <Navigate to={ACCOUNT_URL}/>
        )
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container flex-horizontally-center">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome back &#128075;</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <input type="email" name="email" value={email} required={true} placeholder="Email"
                               onChange={onChange}/>
                        <input type="password" name="password" value={password} required={true} minLength={8}
                               placeholder="Password" onChange={onChange}/>

                        <div className="authentication-field-info">
                            <div>
                                <input id="rememberMe" type="checkbox" name="rememberMe" checked={rememberMe}
                                       required={false} onChange={onChange}/>
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>

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
    isAuthenticated: state.auth.isAuthenticated,
    navigateToAfterLogin: state.common.navigateToAfterLogin,
})

export default connect(mapStateToProps, {login, setNavigateToAfterAuth})(UserLoginPage)