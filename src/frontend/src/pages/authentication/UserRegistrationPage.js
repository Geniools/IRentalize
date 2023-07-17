import React, {useState} from "react";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import {Link} from "react-router-dom";

export default function UserRegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    });
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        phoneNumber,
        address
    } = formData;
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value});

    // TODO: Handle the form submission
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Header showLinks={false} showSearch={false} showAuth={false}/>

            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome to IRentalize</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={onSubmit}>
                        <InputField
                            label=""
                            type="text"
                            name="first-name"
                            value={firstName}
                            placeholder="First Name"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="last-name"
                            value={lastName}
                            placeholder="Last Name"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="phone-number"
                            value={phoneNumber}
                            placeholder="Phone Number"
                            onChange={onChange}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            onChange={onChange}
                        />

                        <button
                            className="authentication-input"
                            type="submit">
                            Register
                        </button>
                    </form>

                    <div>
                        <p>
                            Don't have an account?
                            <Link to={"/account/login/"}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}