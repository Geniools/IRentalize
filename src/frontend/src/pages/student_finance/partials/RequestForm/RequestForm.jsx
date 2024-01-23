import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import axios from "axios";

import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../../../../components/ui/Loader/Loader";
import ModalDisplay from "../../../../components/ui/ModalDisplay/ModalDisplay";

import styles from "./RequestForm.module.css";
import getMainDomain from "../../../../utils/helpers/getMainDomain";

const RequestForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const mainDomain = getMainDomain();

    const [cookie] = useCookies(['csrftoken']);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
        terms_and_conditions: false,
        g_recaptcha_response: ""
    });
    const {first_name, last_name, email, message, terms_and_conditions, g_recaptcha_response} = formData;

    const onChange = event => {
        if (event.target.name === "terms_and_conditions") {
            setFormData({...formData, [event.target.name]: event.target.checked})
            return;
        }
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    // Captcha handling
    const recaptchaRef = React.createRef();
    const handleCaptcha = (value) => {
        setFormData({...formData, g_recaptcha_response: value})
    }

    // Handle the form submission
    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const url = mainDomain.full_url + "/api/student-finance/requests/";
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookie.csrftoken,
            },
        })
            .then((response) => {
                setSuccess(true);
                setError(null);

                // Clear the form
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    message: "",
                    terms_and_conditions: false,
                    g_recaptcha_response: ""
                });
            })
            .catch((error_message) => {
                setSuccess(false);

                // If the response is undefined, then there was a network error
                if (error_message.response === undefined) {
                    setError({
                        non_field_errors: ["Something went wrong. Please try again later."]
                    });
                    return;
                }
                const error_data = error_message.response.data;

                let nonFieldErrors = [];
                // Add the error messages which are not related to a specific field
                for (const [key, value] of Object.entries(error_data)) {
                    if (!formData.hasOwnProperty(key)) {
                        nonFieldErrors.push(value);
                    }
                }
                // Add the non-field errors to the error data
                error_data.non_field_errors = nonFieldErrors;
                setError(error_data);
            })
            .finally(() => {
                setLoading(false);
            });

        // Reset the captcha
        recaptchaRef.current.reset();
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {
                loading &&
                <ModalDisplay>
                    <Loader/>
                </ModalDisplay>
            }
            {
                success &&
                <div className={`${styles.messageContainer} green-text`}>
                    <b><p>Thank you for your request!</p></b>
                    <i><p>We will get back to you as soon as possible.</p></i>
                </div>
            }
            {
                error !== null &&
                <div className={`${styles.messageContainer} red-text`}>
                    <b><p>There was an error submitting your request.</p></b>
                    <i><p>Fix the errors or try again later.</p></i>
                    {
                        error.non_field_errors &&
                        <b><p>
                            {
                                error.non_field_errors.map((entry) => (
                                    <p className={styles.errorMessage}>{entry}</p>
                                ))
                            }
                        </p></b>
                    }
                </div>
            }

            <div className={styles.inlineContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor="first_name">First Name <span className="red-text">*</span></label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        value={first_name}
                        onChange={onChange}
                        className={error?.first_name ? styles.errorInput : ""}
                        required={true}
                    />
                    {
                        error?.first_name &&
                        <b><p className={styles.errorMessage}>{error.first_name}</p></b>
                    }
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="last_name">Last Name <span className="red-text">*</span></label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={onChange}
                        required={true}
                        className={error?.last_name ? styles.errorInput : ""}
                    />
                    {
                        error?.last_name &&
                        <b><p className={styles.errorMessage}>{error.last_name}</p></b>
                    }
                </div>
            </div>

            <div className={styles.inputContainer}>
                <label htmlFor="email">Email <span className="red-text">*</span></label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required={true}
                    className={error?.email ? styles.errorInput : ""}
                />
                {
                    error?.email &&
                    <b><p className={styles.errorMessage}>{error.email}</p></b>
                }
            </div>

            <div className={styles.inputContainer}>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Message"
                    value={message}
                    onChange={onChange}
                    required={false}
                    className={error?.message ? styles.errorInput : ""}
                />
                {
                    error?.message &&
                    <b><p className={styles.errorMessage}>{error.message}</p></b>
                }
            </div>

            <div className={`${styles.inlineContainer} ${styles.inlineContainerTerms}`}>
                <input
                    type="checkbox"
                    name="terms_and_conditions"
                    id="terms_and_conditions"
                    checked={terms_and_conditions}
                    onChange={onChange}
                    required={true}
                    className={error?.terms_and_conditions ? styles.errorInput : ""}
                />
                <label htmlFor="terms_and_conditions">
                    I agree with the <Link to={"#"} className="green-text">terms and conditions </Link>
                    <span className="red-text">*</span>
                </label>
                {
                    error?.terms_and_conditions &&
                    <b><p className={styles.errorMessage}>{error.terms_and_conditions}</p></b>
                }
            </div>

            <div className={styles.inputContainer}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
                    onChange={handleCaptcha}
                    theme={'light'}
                />
                {
                    error?.g_recaptcha_response &&
                    <b><p className={styles.errorMessage}>{error.g_recaptcha_response}</p></b>
                }
            </div>

            <button className={styles.submitButton} type="submit">Submit</button>
        </form>
    )
}

export default RequestForm;