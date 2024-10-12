import {useMemo} from "react";

interface DateFormatterProps {
    date: string;
    showTime?: boolean;
}

const DateFormatter = ({date, showTime = true}: DateFormatterProps) => {
    // Format the date - Example: "02:11 30 Aug 2023"
    // const dateOptions = {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short', year: 'numeric'};
    const dateOptions = useMemo(() => {
        return {hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'short', year: 'numeric'}
    }, []);

    // TODO: Fix typescript errors
    if (!showTime) {
        delete dateOptions.hour;
        delete dateOptions.minute;
    }

    return (
        <>
            {
                new Date(date).toLocaleString('en-GB', dateOptions)
            }
        </>
    )
}

export default DateFormatter;