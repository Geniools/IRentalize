import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import BookingCalendar from "../../../../../components/BookingCalendar/BookingCalendar";

import styles from "./BookingSection.module.css";
import generalStyles from "../ListingDetailsGeneral.module.css";
import {setNavigateToAfterAuth} from "../../../../../actions/common";
import {addBooking} from "../../../../../actions/listing";

const BookingSection = ({availabilities, unavailableDates, price, host, listingId}) => {
    const navigator = useNavigate();
    const {user, isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user ? state.auth.user : {},
    }))
    const dispatch = useDispatch();

    const [canBook, setCanBook] = useState(false);
    const [errorMessages, setErrorMessages] = useState(["Select a date to book this listing!"]);
    const [bookingDates, setBookingDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleBooking = () => {
        if (canBook) {
            // Check if user is logged in
            if (!isAuthenticated) {
                console.log("You need to be logged in to book this listing!")
                // TODO: Show error message
                // Set the navigateToAfterLogin state to the current page
                dispatch(setNavigateToAfterAuth(`/listing/${id}/`))
                    .then(r => {
                        // Redirect to login page if user is not logged in
                        return navigator("/login");
                    });
            }

            // Check if the user is the host of the listing
            if (user.id === host) {
                setErrorMessages(["You are the host of this listing!"]);
                return;
            }

            let startDate = bookingDates[0].startDate.getFullYear() + "-";
            startDate += bookingDates[0].startDate.getMonth() + 1 + "-";
            startDate += bookingDates[0].startDate.getDate();

            let endDate = bookingDates[0].endDate.getFullYear() + "-";
            endDate += bookingDates[0].endDate.getMonth() + 1 + "-";
            endDate += bookingDates[0].endDate.getDate();

            dispatch(addBooking({listingId, startDate, endDate}));
        }
    }

    return (
        <div className={styles.bookingContainer}>
            <BookingCalendar
                availabilities={availabilities}
                unavailableDates={unavailableDates}
                dayPrice={price}
                setCanBook={setCanBook}
                errorMessages={errorMessages}
                setErrorMessages={setErrorMessages}
                bookingDates={bookingDates}
                setBookingDates={setBookingDates}
            />

            <div>
                <button className={generalStyles.button} onClick={handleBooking}>Book now</button>
            </div>
        </div>
    )
}

export default BookingSection;