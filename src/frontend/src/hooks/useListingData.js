import axios from 'axios';
import {useQuery} from "@tanstack/react-query";

const fetchListing = async (id) => {
    try {
        const response = await axios.get(`/api/listings/${id}/`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const useListingData = (id) => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => fetchListing(id)
    });

    return {
        data,
        isLoading
    };
};

export default useListingData;
