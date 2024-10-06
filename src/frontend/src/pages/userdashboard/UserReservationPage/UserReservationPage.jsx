import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import axiosInstanceJSONAPI from "../../../services/axios/axios_content_type_json.ts"

import {Link} from "react-router-dom"
import HeadTitle from "../../../components/HeadTitle.tsx"
import DateFormatter from "../../../components/DateFormatter/DateFormatter"
import PopupConfirmation from "../../../components/PopupConfirmation/PopupConfirmation"

import {RESERVATION_STATUSES} from "../../../utils/constants/RESERVATION_STATUSES.ts"
import "../Userdashboard.css"
import styles from "./UserReservationPage.module.css"

const UserReservationPage = () => {
    useEffect(() => {
        document.title = "My Reservations"
    }, [])
    // Retrieve all reservations for the user
    useEffect(() => {
        axiosInstanceJSONAPI.get("/api/user-listing-reservations/")
            .then(response => {
                // console.log(response.data);
                setReservations(response.data)
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error)
            })
    }, [])
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
            is_paid: "",
            total_price: "",
        },
    ])
    const [reservationStatusChanged, setReservationStatusChanged] = useState(false)
    const [reservationStatusValue, setReservationStatusValue] = useState(0)
    const [reservationIdToChange, setReservationIdToChange] = useState(null)

    const onReservationStatusChange = (event) => {
        setReservationStatusChanged(true)
        setReservationIdToChange(event.target.name)
        setReservationStatusValue(event.target.value)
    }

    const onConfirmReservationStatusChange = (reservationId, statusValue) => {
        // Update the reservation status in the database
        axiosInstanceJSONAPI.put(`/api/user-listing-reservation-status/${reservationId}/`, {
            status: statusValue,
        })
            .then(response => {
                // TODO: Handle response
                console.log(response.data)
            })
            .catch(error => {
                // TODO: Handle error
                console.log(error)
            })

        // Update the reservation status in the state
        const newReservations = reservations.map(reservation =>
            reservation.id === parseInt(reservationId)
                ? {...reservation, status: statusValue}
                : reservation,
        )
        setReservations(newReservations)
        // Close the popup
        setReservationStatusChanged(false)
    }

    const onCancelReservationStatusChange = (event) => {
        setReservationStatusChanged(false)
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
                    <th>Paid</th>
                </tr>
                </thead>
                <tbody>
                {
                    reservations?.map(reservation => (
                        <tr>
                            <td>
                                <Link
                                    className={styles.link}
                                    // target="_blank"
                                    to={`/account/user-posts/${reservation.listing_id}/`}>
                                    {reservation.listing_name}
                                </Link>
                            </td>
                            <td>{reservation.guest_name}</td>
                            <td><DateFormatter date={reservation.start_date} showTime={false}/></td>
                            <td><DateFormatter date={reservation.end_date} showTime={false}/></td>
                            <td>{reservation.total_price}</td>
                            <td>
                                <select
                                    className={styles.select}
                                    value={reservation.status}
                                    name={reservation.id}
                                    onChange={onReservationStatusChange}>
                                    {/* TODO: Figure out what of the below can be manipulated and how */}
                                    {
                                        Object.entries(RESERVATION_STATUSES).map(([key, value]) => (
                                            <option key={key} value={key}>{value}</option>
                                        ))
                                    }
                                </select>
                            </td>
                            <td>{reservation.is_paid ? "Yes" : "No"}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {
                reservationStatusChanged && (
                    <PopupConfirmation
                        title={"Change Reservation Status"}
                        message={`Are you sure you want to change this reservation's status to ${RESERVATION_STATUSES[reservationStatusValue]}?`}
                        onConfirm={() => onConfirmReservationStatusChange(reservationIdToChange, reservationStatusValue)}
                        onCancel={onCancelReservationStatusChange}
                    />
                )
            }
        </>
    )
}

export default connect(null, {})(UserReservationPage)