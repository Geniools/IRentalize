import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";

import axiosInstanceJSONAPI from "../../../services/axios/axios_content_type_json";

import {Link} from "react-router-dom";
import HeadTitle from "../../../components/ui/HeadTitle/HeadTitle";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";

import {RESERVATION_STATUSES} from "../../../utils/constants/RESERVATION_STATUSES";
import "../Userdashboard.css";
import styles from "../UserReservationPage/UserReservationPage.module.css";

const UserOrdersPage = () => {
    useEffect(() => {
        document.title = "My Orders";
    }, []);
    // Retrieve all reservations for the user
    useEffect(() => {
        axiosInstanceJSONAPI.get("/api/user-listing-orders/")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    }, []);
    const [orders, setOrders] = useState([{
        id: "",
        guest_name: "",
        listing_id: "",
        listing_name: "",
        start_date: "",
        end_date: "",
        status: 0,
        is_paid: false,
        total_price: "",
        updated_at: "",
        created_at: ""
    }]);

    return (
        <>
            <HeadTitle title={"My Orders"} capitalize={true}/>

            <table>
                <thead>
                <tr>
                    <th>Listing</th>
                    <th>Guest</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Paid</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders?.map(order => (
                        <tr>
                            <td>
                                <Link
                                    className={styles.link}
                                    target="_blank"
                                    to={`/listing/${order.listing_id}/`}>
                                    {order.listing_name}
                                </Link>
                            </td>
                            <td>{order.guest_name}</td>
                            <td><DateFormatter date={order.start_date} showTime={false}/></td>
                            <td><DateFormatter date={order.end_date} showTime={false}/></td>
                            <td>{order.total_price}</td>
                            <td>{RESERVATION_STATUSES[order.status]}</td>
                            <td>{order.is_paid ? "Yes" : "No"}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default connect(null, {})(UserOrdersPage);