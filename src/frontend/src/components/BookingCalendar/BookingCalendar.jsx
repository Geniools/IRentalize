import React from 'react';
// Needed for the DateRange component
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from "react-date-range";
// =============================================================================
import HeadSubTitle from "../ui/HeadSubTitle/HeadSubTitle";

import styles from "./BookingCalendar.module.css";

import useAvailableDates from "./hooks/useAvailableDates";
import {getDatesBetween} from "../../utils/helpers/booking";


const BookingCalendar = ({
                             availabilities,
                             unavailableDates,
                             dayPrice,
                             setCanBook,
                             errorMessages,
                             setErrorMessages,
                             bookingDates,
                             setBookingDates
                         }) => {
    const {
        availableDates
    } = useAvailableDates({
        unavailableDates: unavailableDates,
        availabilities: availabilities
    });

    const isDayDisabled = (day) => {
        // Disable the days that are not available
        return !availableDates.some(date =>
            date.getFullYear() === day.getFullYear() &&
            date.getMonth() === day.getMonth() &&
            date.getDate() === day.getDate()
        );
    }

    const handleSelect = (ranges) => {
        // Reset the error messages
        setErrorMessages([]);
        // Reset the canBook state
        setCanBook(true);
        // Get the dates between the start and end dates of the selected range
        const dates = getDatesBetween(ranges.selection.startDate, ranges.selection.endDate);
        let error = false;
        // Check if any of the dates are not available
        dates.map(date => {
            if (isDayDisabled(date)) {
                setErrorMessages(prevState => prevState.concat(`The date ${date.toLocaleDateString('nl-NL')} is not available!`));
                // Error(s) found
                error = true
            }
        });
        // If there is at least one error message, return
        if (error) {
            setCanBook(false);
            return;
        }
        // Handle the selected date range
        setBookingDates([ranges.selection]);
    };

    const calculatePrice = () => {
        if (errorMessages.length > 0) return 0;
        // Calculate the price of the selected date range
        const dates = getDatesBetween(bookingDates[0].startDate, bookingDates[0].endDate);
        return dates.length * dayPrice;
    }

    return (
        <div className={styles.dateRangeContainer}>
            <DateRange
                // className={styles.dateRangeContainer}
                ranges={bookingDates}
                onChange={handleSelect}
                minDate={new Date()}
                // Set the max date to 1 year from today
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                disabledDay={isDayDisabled}
                editableDateInputs={false}
                moveRangeOnFirstSelection={false}
                retainEndDateOnFirstSelection={false}
                showDateDisplay={true}
                weekStartsOn={1}
            />

            <div className={styles.priceContainer}>
                <HeadSubTitle title={`€${dayPrice} a day`}/>
                <p><b>Total: </b>{calculatePrice()} &euro;</p>
            </div>
        </div>
    );
};

export default BookingCalendar;
