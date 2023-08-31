import axios from "axios";

export const sendContactUsForm = (full_name, email, phone_number, message, terms_and_conditions) => async (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({full_name, email, phone_number, message, terms_and_conditions});

    try {
        const res = await axios.post("/api/contact-us/", body, config);

        // TODO: Add more explicit message to the frontend
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}