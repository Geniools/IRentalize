import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {setNavigateToAfterAuth} from "../../../../../actions/common";
import useAddBooking from "./hooks/useAddBooking";

import BookingCalendar from "../../../../../components/BookingCalendar/BookingCalendar";

import styles from "./BookingSection.module.css";

const BookingSection = ({availabilities, unavailableDates, price, host, listingId}) => {
    const navigator = useNavigate();
    // Get the user and isAuthenticated state from the store
    const {user, isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user ? state.auth.user : {},
    }))
    const dispatch = useDispatch();

    // Error messages
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
                dispatch(setNavigateToAfterAuth(`/listing/${listingId}/`))
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

            // Format the dates
            let startDate = bookingDates[0].startDate.getFullYear() + "-";
            startDate += bookingDates[0].startDate.getMonth() + 1 + "-";
            startDate += bookingDates[0].startDate.getDate();

            let endDate = bookingDates[0].endDate.getFullYear() + "-";
            endDate += bookingDates[0].endDate.getMonth() + 1 + "-";
            endDate += bookingDates[0].endDate.getDate();

            console.log("1")

            // TODO: Fix this
            const {
                data: booking,
                isLoading,
                isError,
                error
            } = useAddBooking({listingId, startDate, endDate});

            console.log("2")
            // Check if there is an error
            if (isError) {
                setErrorMessages([error]);
            }
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

            <div className={styles.errorContainer}>
                {
                    errorMessages.map((errorMessage, index) => (
                        <p key={index} className={"error-text"}>{errorMessage}</p>
                    ))
                }
            </div>

            <div className={"flex-container flex-right-content"}>
                <button onClick={handleBooking}>Book now</button>
            </div>
        </div>
    )
}

export default BookingSection;