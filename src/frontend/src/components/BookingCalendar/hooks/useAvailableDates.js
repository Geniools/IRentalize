import {useEffect, useState} from "react";
import {getDatesBetween} from "../../../utils/helpers/booking";


const useAvailableDates = ({unavailableDates, availabilities}) => {
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        // Convert the unavailableDates array to Date objects
        unavailableDates = unavailableDates.map(date => new Date(date));
        // Loop through the availabilities and add all the dates to the availableDates array
        availabilities.map(availability => {
            const dates = getDatesBetween(availability.start_date, availability.end_date);
            dates.map(date => {
                // Check if the date is not in the unavailableDates array
                if (!unavailableDates.some(unavailableDate =>
                    unavailableDate.getFullYear() === date.getFullYear() &&
                    unavailableDate.getMonth() === date.getMonth() &&
                    unavailableDate.getDate() === date.getDate()
                )) {
                    setAvailableDates(prevState => prevState.concat(date));
                }
            })
        });
    }, [unavailableDates, availabilities]);

    return {
        availableDates
    };
}

export default useAvailableDates;