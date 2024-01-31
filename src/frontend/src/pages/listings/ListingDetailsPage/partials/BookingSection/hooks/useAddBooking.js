import {useMutation} from "@tanstack/react-query";

import axiosInstanceJSONAPI from "../../../../../../services/axios/axios_content_type_json";

const addBooking = async ({listingId, startDate, endDate}) => {
    // Convert the startDate and endDate to the format: YYYY-MM-DD
    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];
    // Send the request to the backend
    const body = JSON.stringify({
        listing: listingId,
        start_date: startDate,
        end_date: endDate
    });
    return await axiosInstanceJSONAPI.post('/api/listing-reservation/', body);
}

const useAddBooking = ({listingId, startDate, endDate}) => {
    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        error
    } = useMutation({
        mutationFn: addBooking,
    })

    const addBookingHandler = () => {
        mutate({listingId, startDate, endDate});
    }

    return {
        addBookingHandler,
        isPending,
        isError,
        isSuccess,
        error
    };
}

export default useAddBooking;