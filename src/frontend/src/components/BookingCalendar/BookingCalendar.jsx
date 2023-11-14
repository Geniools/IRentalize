import React, {useEffect, useState} from 'react';
// Needed for the DateRange component
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from "react-date-range";
// =============================================================================
import styles from "./BookingCalendar.module.css";
import HeadSubTitle from "../HeadSubTitle/HeadSubTitle";

const getDatesBetween = (startDate, endDate) => {
    // Get the dates between the start and end dates
    const dates = [];
    const currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

const BookingCalendar = ({availabilities, dayPrice, setCanBook, errorMessages, setErrorMessages, bookingDates, setBookingDates}) => {
    const [availableDates, setAvailableDates] = useState([]);
    useEffect(() => {
        // Loop through the availabilities and add all the dates to the availableDates array
        availabilities.map(availability => {
            const dates = getDatesBetween(availability.start_date, availability.end_date);
            setAvailableDates(prevState => prevState.concat(dates));
        });
    }, []);

    const isDayDisabled = (day) => {
        // Disable the days that are not available
        // return !availableDates.some(date => date.getTime() === day.getTime());
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
                if (!error) {
                    error = true
                }
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
                // Set the min date to today
                minDate={new Date()}
                // Set the max date to 1 year from today
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                disabledDay={isDayDisabled}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                retainEndDateOnFirstSelection={false}
                showDateDisplay={true}
                weekStartsOn={1}
            />

            <div className={styles.errorContainer}>
                {
                    errorMessages.map((errorMessage, index) => (
                        <p key={index} className={styles.errorText}>{errorMessage}</p>
                    ))
                }
            </div>

            <div className={styles.priceContainer}>
                <HeadSubTitle title={`€${dayPrice} per day`}/>
                <p><b>Total: </b>{calculatePrice()} &euro;</p>
            </div>
        </div>
    );
};

export default BookingCalendar;
