import axiosInstanceJSONAPI from "../../../../../../services/axios/axios_content_type_json";
import {useQuery} from "@tanstack/react-query";

const addBooking = async (listingId, startDate, endDate) => {
    const body = JSON.stringify({listing: listingId, start_date: startDate, end_date: endDate});

    try {
        const response = await axiosInstanceJSONAPI.post('/api/listing-reservation/', body);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

const useAddBooking = ({listingId, startDate, endDate}) => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['addBooking', listingId, startDate, endDate],
        queryFn: () => addBooking(listingId, startDate, endDate)
    });

    return {
        data,
        isLoading,
        isError,
        error
    }
}

export default useAddBooking;