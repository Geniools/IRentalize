import React, {useState} from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";

export default function UserRegistrationPage() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    // TODO: Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <>
            <Header/>
            <div className="page-container">
                <div className="authentication-form">
                    <div className="authentication-header">
                        <h1>Welcome to IRentalize</h1>
                        <h2>Please enter your details</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <InputField
                            label=""
                            type="text"
                            name="first-name"
                            value={firstName}
                            placeholder="First Name"
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="last-name"
                            value={lastName}
                            placeholder="Last Name"
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
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
                        <InputField
                            label=""
                            type="text"
                            name="phone-number"
                            value={phoneNumber}
                            placeholder="Phone Number"
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
                        <InputField
                            label=""
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                        />

                        <button
                            className="authentication-input"
                            type="submit">
                            Register
                        </button>
                    </form>

                    <div>
                        <p>Don't have an account? <a href="/account/login/">Sign In</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}