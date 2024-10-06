import {useEffect, useState} from "react"
import moment from "moment"

import {getDatesBetween, isWithinAvailabilities} from "../../../utils/helpers/booking.js"

const useBookingDates = ({availabilities, isDayDisabled}) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Check if the firstDate and lastDate are within the availabilities
        if (!startDate || !endDate) {
            return
        }

        // Check if all dates are within the availabilities and are not disabled
        const dates = getDatesBetween(startDate, endDate)
        const withinAvailabilities = dates.every(date => {
            const day = moment(date)
            return !isDayDisabled(day) && isWithinAvailabilities(day, availabilities)
        })

        if (!withinAvailabilities) {
            setStartDate(null)
            setEndDate(null)
            setError('The selected dates are not available!')
        } else {
            setError(null)
        }
    }, [startDate, endDate, availabilities])

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    return {
        startDate,
        endDate,
        handleStartDateChange,
        handleEndDateChange,
        error,
    }
}

export default useBookingDates