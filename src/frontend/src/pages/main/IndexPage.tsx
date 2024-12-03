import useListingsQuery from "@/hooks/useListingsQuery"
import Loader from "@/components/Loader/Loader"
import ListingCard from "@/components/ListingCard"
import InfiniteScroll from "react-infinite-scroll-component";


const IndexPage = () => {
    const {
        listings,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useListingsQuery();

    return (
        <>
            {
                !isLoading ?
                    <InfiniteScroll
                        dataLength={listings.length}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<Loader/>}
                        endMessage={<span></span>}
                        className="flex flex-row flex-wrap gap-8 justify-center"
                    >
                        {
                            listings?.map((listing) => {
                                return (
                                    <ListingCard key={listing.id} listing={listing} url={"/listing/"}/>
                                )
                            })
                        }
                    </InfiniteScroll>
                    :
                    <div className="flex justify-center items-center">
                        <Loader/>
                    </div>

            }
        </>
    )
}

export default IndexPage
