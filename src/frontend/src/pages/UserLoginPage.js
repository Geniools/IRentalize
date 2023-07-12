import React, {useState} from 'react';
import InputField from "../components/InputField";
import Header from "../components/Header";
import axios from "axios";

export default function UserLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Make a POST request to the backend
        const data = {
            "email": email,
            "password": password,
        }

        // Send the data to the backend
        axios.post('/api/auth/login/', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Header/>
            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome back &#128075;</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <InputField
                            label=""
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />

                        <InputField
                            label=""
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />

                        <div className="authentication-field-info">
                            <InputField
                                order="input-first"
                                type="checkbox"
                                label="Remember me"
                                name="remember-me"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(event) => {
                                    setRememberMe(event.target.checked);
                                }}
                            />
                            <a href="/accounts/password-reset/">Forgot Password</a>
                        </div>

                        <button
                            className="authentication-input"
                            type="submit">
                            LOG IN
                        </button>
                    </form>

                    <div>
                        <p>Don't have an account? <a href="/account/register/">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}