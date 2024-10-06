import moment from "moment/moment";

export const getDatesBetween = (startDate: string, endDate: string): Date[] => {
    // Get the dates between the start and end dates
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// TODO: Add TS types

export const calculateBookingPrice = ({startDate, endDate, dayPrice}: {
    startDate: string,
    endDate: string,
    dayPrice: number
}) => {
    if (!startDate || !endDate || !dayPrice) {
        return 0;
    }

    // Calculate the price of the selected date range
    const dates = getDatesBetween(startDate, endDate);
    return dates.length * dayPrice;
}

export const isWithinAvailabilities = (dayMoment: moment.Moment, availabilities: {
    start_date: moment.MomentInput;
    end_date: moment.MomentInput;
}[]) => {
    // Check if the day is in between the start and end date of the availabilities
    const between = availabilities.map((date: { start_date: moment.MomentInput; end_date: moment.MomentInput; }) => {
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

export const findFirstAndLastDate = (datesArray: []) => {
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