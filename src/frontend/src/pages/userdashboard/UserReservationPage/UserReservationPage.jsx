import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import axiosInstanceJSONAPI from "../../../utils/axios/axios_content_type_json";

import HeadTitle from "../../../components/HeadTitle/HeadTitle";
import DateFormatter from "../../../components/DateFormatter/DateFormatter";
import {Link} from "react-router-dom";

import "../Userdashboard.css";
import styles from "./UserReservationPage.module.css";

const UserReservationPage = () => {
    useEffect(() => {
        document.title = "My Reservations";
    }, []);
    // Retrieve all reservations for the user
    useEffect(() => {
        axiosInstanceJSONAPI.get("/api/user-listing-reservations/")
            .then(response => {
                console.log(response.data);
                setReservations(response.data);
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error);
            });
    }, []);
    const [reservations, setReservations] = useState([
        {
            created_at: "",
            updated_at: "",
            end_date: "",
            start_date: "",
            guest_name: "",
            listing_name: "",
            listing_id: "",
            status: "",
            total_price: "",
        }
    ]);

    const changeReservationStatus = (event) => {
        console.log(event.target.value);
    }

    return (
        <>
            <HeadTitle title={"My Reservations"} capitalize={true}/>

            <table>
                <thead>
                <tr>
                    <th>Listing</th>
                    <th>Guest</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    reservations?.map(reservation => (
                        <tr>
                            <td><Link className={styles.link} to={`/account/user-posts/${reservation.listing_id}/`}>{reservation.listing_name}</Link></td>
                            <td>{reservation.guest_name}</td>
                            <td><DateFormatter date={reservation.start_date} showTime={false}/></td>
                            <td><DateFormatter date={reservation.end_date} showTime={false}/></td>
                            <td>{reservation.total_price}</td>
                            <td>
                                <select className={styles.select} value={reservation.status} name={reservation.id} onChange={changeReservationStatus}>
                                    <option value="0">Pending</option>
                                    {/* Confirmed: 1 */}
                                    <option value="1">Accept</option>
                                    {/* Cancelled: 2 */}
                                    <option value="2">Cancel</option>
                                    {/* Completed: 3 */}
                                    <option value="3">Complete</option>
                                </select>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default connect(null, {})(UserReservationPage);