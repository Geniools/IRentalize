import React, {useMemo} from "react";

const DateFormatter = ({date, showTime = true}) => {
    // Format the date - Example: "Aug 30, 2023, 02:11 PM"
    // const dateOptions = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}
    const dateOptions = useMemo(() => {
        return {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}
    }, []);

    if (!showTime) {
        delete dateOptions.hour;
        delete dateOptions.minute;
    }

    return (
        <>
            {
                new Date(date).toLocaleString('nl-NL', dateOptions)
            }
        </>
    )
}

export default DateFormatter;