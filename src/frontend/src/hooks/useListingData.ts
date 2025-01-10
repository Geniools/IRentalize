import axios from 'axios';
import {useQuery} from "@tanstack/react-query";

const fetchListing = async (id: number) => {
    const response = await axios.get(`/api/listings/${id}/`);
    return response.data;
}

const useListingData = (id: number): {
    data?: Listing,
    isLoading: boolean,
    isError: boolean,
} => {
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
        isLoading,
        isError,
    };
};

export default useListingData;
