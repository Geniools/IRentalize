import React, {useEffect, useState} from "react"

// import "react-dates/initialize"
// import "react-dates/lib/css/_datepicker.css"
// import {DateRangePicker} from "react-dates"
import useScreenWidthSize from "../../hooks/useScreenWidthSize.js"

const Calendar = ({
                      startDate,
                      handleStartDateChange,
                      endDate,
                      handleEndDateChange,
                      firstDate,
                      lastDate,
                      isDayDisabled,
                  }) => {
    const dateFormat = "DD-MM-YYYY"
    const [focusedInput, setFocusedInput] = useState(null)
    const [nrOfMonths, setNrOfMonths] = useState(1)
    const screenSize = useScreenWidthSize()

    useEffect(() => {
        if (screenSize <= 700) {
            setNrOfMonths(1)
        } else if (screenSize <= 1000) {
            setNrOfMonths(2)
        } else if (screenSize <= 1300) {
            setNrOfMonths(3)
        } else {
            setNrOfMonths(4)
        }
    }, [screenSize])

    return (
        // <DateRangePicker
        //     startDate={startDate}
        //     startDateId="start-date"
        //     endDate={endDate}
        //     endDateId="end-date"
        //     onDatesChange={({startDate, endDate}) => {
        //         handleStartDateChange(startDate)
        //         handleEndDateChange(endDate)
        //     }}
        //     focusedInput={focusedInput}
        //     onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        //     // The format to display the dates in the input fields
        //     displayFormat={dateFormat}
        //     // Opens the calendar in a portal (as a modal)
        //     withPortal={true}
        //     reopenPickerOnClearDates={false}
        //     // Keeps the calendar open when the selected date(s) change
        //     keepOpenOnDateSelect={true}
        //     isDayBlocked={isDayDisabled}
        //     minDate={moment(firstDate)}
        //     maxDate={moment(lastDate)}
        //     // The number of months to display in the calendar at once
        //     numberOfMonths={nrOfMonths}
        // />
        <p>TODO: Change the Date Picker!</p>
    )
}

export default Calendar