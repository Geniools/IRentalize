import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"

import {ACCOUNT_URL} from "../../../../../lib/constants/url_paths.ts"

import {setNavigateToAfterAuth} from "../../../../../actions/common"
import {calculateBookingPrice, getDatesBetween} from "../../../../../lib/helpers/booking.js"

import useBookingDates from "../../../../../components/BookingCalendar/hooks/useBookingDates"
import useAvailableDates from "../../../../../components/BookingCalendar/hooks/useAvailableDates"
import useAddBooking from "./hooks/useAddBooking"

import HeadSubTitle from "../../../../../components/HeadSubTitle.tsx"
import Calendar from "../../../../../components/BookingCalendar/Calendar"
import Loader from "../../../../../components/Loader/Loader.js"

import styles from "./BookingSection.module.css"

const BookingSection = ({
                            availabilities,
                            unavailableDates,
                            price,
                            host,
                            listingId,
                        }) => {
    const navigator = useNavigate()
    // Get the user and isAuthenticated state from the store
    const {user, isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user ? state.auth.user : {},
    }))
    const dispatch = useDispatch()

    // Error messages
    const [errorMessages, setErrorMessages] = useState("")
    // Booked dates
    const [bookedDates, setBookedDates] = useState([])

    // Dates
    const {
        firstDate,
        lastDate,
        isDayDisabled,
    } = useAvailableDates({
        unavailableDates: unavailableDates,
        availabilities: availabilities,
        bookedDates: bookedDates,
    })

    const {
        startDate,
        endDate,
        handleStartDateChange,
        handleEndDateChange,
        error: bookingError,
    } = useBookingDates({
        availabilities: availabilities,
        isDayDisabled: isDayDisabled,
    })

    // Booking process
    const {
        addBookingHandler: createBooking,
        isPending,
        isError: isCreatingBookingError,
        isSuccess,
        error: creatingBookingError,
    } = useAddBooking({
        listingId,
        startDate,
        endDate,
    })

    useEffect(() => {
        // Update the booked dates if the booking was successful
        if (isSuccess) {
            // Get all the dates between the start and end date
            const successBookedDates = getDatesBetween(startDate, endDate)
            // Update the booked dates
            setBookedDates([...bookedDates, ...successBookedDates])
            // Reset the error messages
            setErrorMessages("")
            // Reset the start and end date
            handleStartDateChange(null)
            handleEndDateChange(null)
        }
    }, [isSuccess])

    const handleBooking = () => {
        // Check if user is logged in
        if (!isAuthenticated) {
            // Set the navigateToAfterLogin state to the current page
            dispatch(setNavigateToAfterAuth(`/listing/${listingId}/#booking-section`))
                .then(r => {
                    // Redirect to login page if user is not logged in
                    return navigator("/login")
                })
        }
        // Check if the user is the host of the listing
        if (user.id === host) {
            setErrorMessages("You are the host of this listing!")
            return
        }
        // Check if the user has selected two dates
        if (startDate === null || endDate === null) {
            setErrorMessages('Please select two dates first!')
            return
        }
        // Try making the booking
        createBooking()
    }

    return (
        <div className={styles.bookingContainer} id="booking-section">
            <HeadSubTitle title={"Book this listing"}/>

            {
                isPending ? (
                    <Loader/>
                ) : (
                    <Calendar
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDateChange={handleStartDateChange}
                        handleEndDateChange={handleEndDateChange}
                        firstDate={firstDate}
                        lastDate={lastDate}
                        isDayDisabled={isDayDisabled}
                    />
                )
            }

            <div className={styles.resultMessageContainer}>
                <p>Price per day: <b>{price}€</b></p>
                <p>Total price: <b><i>{calculateBookingPrice({startDate, endDate, dayPrice: price})}€</i></b></p>
            </div>

            <div className={`${styles.resultMessageContainer}`}>
                {isCreatingBookingError && (
                    Object.entries(creatingBookingError?.response.data).map(([key, value]) => {
                        return (
                            <p className={"error-text"}>{key}: {Array.isArray(value) ? value.map(message => message) : value}</p>
                        )
                    })
                )}
                {errorMessages && <p className={"error-text"}>{errorMessages}</p>}
                {bookingError && <p className={"error-text"}>{bookingError}</p>}
            </div>

            <div className={styles.resultMessageContainer}>
                {isSuccess && (
                    <p className={"success-text"}>
                        Your booking was successful! You can check its status in the <b><i><Link
                        to={ACCOUNT_URL}>dashboard</Link></i></b>!
                    </p>
                )}
            </div>

            <div className={"flex-container flex-right-content"}>
                <button onClick={handleBooking} disabled={isPending}>Book now</button>
            </div>
        </div>
    )
}

export default BookingSection