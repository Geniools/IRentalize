import useListingsQuery from "@/hooks/useListingsQuery"
import Loader from "@/components/Loader/Loader"
import ListingLink from "@/components/ListingLink"
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
                !isLoading ? (
                    <InfiniteScroll
                        dataLength={listings?.length}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<Loader/>}
                        endMessage={<p>End of results</p>}
                        className="flex flex-row flex-wrap gap-8 content-center"
                    >
                        {
                            listings?.map((listing) => {
                                return (
                                    <ListingLink key={listing.id} listing={listing} url={"/listing/"}/>
                                )
                            })
                        }
                    </InfiniteScroll>
                ) : (
                    <div className="flex-horizontally-center">
                        <Loader/>
                    </div>
                )
            }
        </>
    )
}

export default IndexPage
