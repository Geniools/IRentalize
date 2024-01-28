import axios from "axios";
import {useInfiniteQuery} from "@tanstack/react-query";

const fetchListings = async (pageParam) => {
    try {
        const response = await axios.get(`/api/listings/?page=${pageParam}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

const useListingsQuery = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['listings'],
        queryFn: ({pageParam}) => fetchListings(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next
    })

    // Flatten the data, so we don't have to deal with nested arrays
    const listings = data?.pages.reduce(
        (acc, page) => {
            return [...acc, ...page.results]
        }, []
    );

    return {
        listings,
        fetchNextPage,
        hasNextPage,
        isLoading
    }
}

export default useListingsQuery;