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
                        onChange={(firstName) => {
                            setFirstName(firstName.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="text"
                        name="last-name"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={(lastName) => {
                            setLastName(lastName.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={(username) => {
                            setUsername(username.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(email) => {
                            setEmail(email.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(password) => {
                            setPassword(password.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="text"
                        name="phone-number"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        onChange={(phoneNumber) => {
                            setPhoneNumber(phoneNumber.value);
                        }}
                    />
                    <InputField
                        label=""
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address"
                        onChange={(address) => {
                            setAddress(address.value);
                        }}
                    />

                    <button
                        className="authentication-input"
                        type="submit">
                        Register
                    </button>
                </form>

                <div>
                    <p>Don't have an account? <a href="/accounts/login/">Sign In</a></p>
                </div>
            </div>
        </>
    )
}