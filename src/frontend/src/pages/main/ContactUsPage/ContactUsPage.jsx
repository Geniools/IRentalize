import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

import Header from "../../../components/Header/Header";
import {sendContactUsForm} from "../../../actions/utils";

import "./ContactUsPage.css";

const ContactUsPage = ({sendContactUsForm}) => {
    useEffect(() => {
        document.title = "Contact Us";
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
        termsAndConditions: false,
        captcha: false,
        gRecaptchaResponse: ""
    });
    const {fullName, email, phoneNumber, message, termsAndConditions, captcha, gRecaptchaResponse} = formData;
    const onChange = event => {
        if (event.target.name === "termsAndConditions") {
            setFormData({...formData, [event.target.name]: event.target.checked})
            return;
        }
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const recaptchaRef = React.createRef();
    const handleCaptcha = (value) => {
        setFormData({...formData, gRecaptchaResponse: value})
    }

    // Handle the form submission
    const onSubmit = (event) => {
        event.preventDefault();
        sendContactUsForm(fullName, email, phoneNumber, message, termsAndConditions, gRecaptchaResponse);
        // Reset the captcha
        recaptchaRef.current.reset();
    }

    return (
        <>
            <Header/>

            <div className={"page-container"}>
                <div className="contact-us-header">
                    <h1>Contact Us</h1>
                    <p>Please enter your details</p>
                </div>

                <form onSubmit={onSubmit} className="contact-us-form">
                    <div className="contact-us-form-container">
                        <div className="contact-us-form-container-input">
                            <label className="green-text" htmlFor="fullName">Full Name*</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={fullName}
                                required
                                placeholder="Full Name"
                                onChange={onChange}
                            />
                        </div>

                        <div className="contact-us-form-container-input">
                            <label className="green-text" htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                required
                                placeholder="Email"
                                onChange={onChange}
                            />
                        </div>

                        <div className="contact-us-form-container-input">
                            <label htmlFor="phoneNumber">Phone</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                placeholder="Phone Number"
                                onChange={onChange}
                            />
                        </div>

                    </div>

                    <div className="contact-us-form-container">
                        <div className="contact-us-form-container-input">
                            <label htmlFor="message" className={"green-text"}>Message*</label>
                            <textarea name="message" id="message" placeholder={"Enter your message here"} value={message} onChange={onChange}></textarea>
                        </div>
                    </div>

                    <div className="contact-us-form-container">
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            id="termsAndConditions"
                            checked={termsAndConditions}
                            required={true}
                            onChange={onChange}
                        />
                        <label htmlFor={"termsAndConditions"}>I agree with <a className={"green-text"} href="">Terms and Conditions*</a></label>
                    </div>

                    <ReCAPTCHA
                        sitekey={"6Lf4XvgnAAAAALBJKdqmMoBvbywdVks4v7SvwG2j"}
                        ref={recaptchaRef}
                        onChange={handleCaptcha}
                    />

                    <div className="contact-us-form-container">
                        <div className="contact-us-form-container-input">
                            <button type="submit"> CONTACT US</button>
                        </div>
                    </div>
                </form>

                <div className="contact-us-footer">
                    <p>Or send us an e-mail: &nbsp;</p>
                    <a href="mailto:irentalize@gmail.com" type={"email"}><b>irentalize@gmail.com</b></a>
                </div>
            </div>
        </>
    )
}

export default connect(null, {sendContactUsForm})(ContactUsPage);