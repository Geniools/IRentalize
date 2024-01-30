import moment from "moment/moment";

export const getDatesBetween = (startDate, endDate) => {
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

export const calculateBookingPrice = ({startDate, endDate, dayPrice}) => {
    if (!startDate || !endDate || !dayPrice) {
        return 0;
    }

    // Calculate the price of the selected date range
    const dates = getDatesBetween(startDate, endDate);
    return dates.length * dayPrice;
}

export const isWithinAvailabilities = (dayMoment, availabilities) => {
    // Check if the day is in between the start and end date of the availabilities
    const between = availabilities.map(date => {
        if (dayMoment.isBetween(moment(date.start_date), moment(date.end_date), 'day', '[]')) {
            return true;
        }
    })
    // If the day is in between the start and end date of the availabilities, return true
    if (between.includes(true)) {
        return true;
    }

    // If the day is not in between the start and end date of the availabilities, return false
    return false;
}

export const findFirstAndLastDate = (datesArray) => {
    // Ensure the array is not empty
    if (!datesArray || datesArray.length === 0) {
        return {firstDay: null, lastDay: null};
    }

    const firstDate = new Date(Math.min(...datesArray));
    const lastDate = new Date(Math.max(...datesArray));

    return {
        firstDate,
        lastDate
    }
}