import React, {useState} from 'react';
import InputField from "../components/InputField";
import Header from "../components/Header";

export default function UserLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Handle the form submission
        console.log(email);
    }

    return (
        <>
            <Header/>
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
                        onChange={(email) => {
                            setEmail(email.value);
                        }}/>

                    <InputField
                        label=""
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(pass) => {
                            setPassword(pass.value);
                        }}/>

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
                            }
                            }/>
                        <a href="/accounts/password-reset/">Forgot Password</a>
                    </div>

                    <button
                        className="authentication-input"
                        type="submit">
                        LOG IN
                    </button>
                </form>

                <div>
                    <p>Don't have an account? <a href="/accounts/register/">Sign Up</a></p>
                </div>
            </div>
        </>
    )
}