import axios from "axios"
import {useInfiniteQuery} from "@tanstack/react-query"


const fetchListings = async (pageParam: number): Promise<ListingPage> => {
    const response = await axios.get(`/api/listings/?page=${pageParam}`)
    return response.data
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
        getNextPageParam: (lastPage) => lastPage.next,
    })

    // Flatten the data, so we don't have to deal with nested arrays
    const listings: Listing[] = []
    data?.pages.map((page) => {
        // Add all the results from a page to the 'listing' array
        listings.push(...page.results)
    })

    return {
        listings,
        fetchNextPage,
        hasNextPage,
        isLoading,
    }
}

export default useListingsQuery