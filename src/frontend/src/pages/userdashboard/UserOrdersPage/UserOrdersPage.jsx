import React, {useEffect} from 'react';
import {connect} from "react-redux";

import HeadTitle from "../../../components/HeadTitle/HeadTitle";

import "../Userdashboard.css";
import axiosInstanceJSONAPI from "../../../utils/axios/axios_content_type_json";

const UserOrdersPage = () => {
    useEffect(() => {
        document.title = "My Orders";
    }, []);
    // Retrieve all reservations for the user
    useEffect(() => {
        axiosInstanceJSONAPI.get("/api/user-listing-orders/")
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    }, []);

    return (
        <>
            <HeadTitle title={"My Orders"} capitalize={true}/>


        </>
    )
}

export default connect(null, {})(UserOrdersPage);