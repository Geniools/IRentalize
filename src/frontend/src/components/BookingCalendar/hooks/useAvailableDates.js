import {useEffect, useState} from "react"

import {findFirstAndLastDate, isWithinAvailabilities} from "../../../utils/helpers/booking.js"

const useAvailableDates = ({unavailableDates, availabilities, bookedDates}) => {
    const [unavailableDatesState, setUnavailableDatesState] = useState([])
    const [firstDate, setFirstDate] = useState(null)
    const [lastDate, setLastDate] = useState(null)

    const isDayDisabled = (dayMoment) => {
        // Check if the day is in the unavailableDatesState
        if (unavailableDatesState.some(date => dayMoment.isSame(date, 'day'))) {
            return true
        }
        return !isWithinAvailabilities(dayMoment, availabilities)
    }

    useEffect(() => {
        // Convert the unavailableDates array to Date objects
        const unavailableDatesArray = unavailableDates.map(date => new Date(date))
        setUnavailableDatesState(unavailableDatesArray)
        // Add the bookedDates to the unavailableDatesState
        const bookedDatesArray = bookedDates.map(date => new Date(date))
        setUnavailableDatesState(prevState => [...prevState, ...bookedDatesArray])
    }, [unavailableDates, bookedDates])

    useEffect(() => {
        // Convert the availabilities array to Date objects
        const availableDatesArray = []
        availabilities.map(date => {
            availableDatesArray.push(new Date(date.start_date))
            availableDatesArray.push(new Date(date.end_date))
        })

        const {firstDate, lastDate} = findFirstAndLastDate(availableDatesArray)
        setFirstDate(firstDate)
        setLastDate(lastDate)
    }, [availabilities])

    return {
        firstDate,
        lastDate,
        isDayDisabled,
    }
}

export default useAvailableDates