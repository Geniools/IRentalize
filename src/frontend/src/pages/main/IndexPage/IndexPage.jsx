import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import useListingsQuery from "../../../hooks/useListingsQuery";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Loader from "../../../components/ui/Loader/Loader";
import ListingLink from "../../../components/ListingLink/ListingLink";

import "./IndexPage.css";

const IndexPage = () => {
    const {
        listings,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useListingsQuery();

    return (
        <>
            <Header/>

            <div className="page-container">
                {
                    !isLoading ? (
                        <InfiniteScroll
                            dataLength={listings.length}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Loader/>}
                            endMessage={<p>End of results</p>}
                            className="listings"
                        >
                            {
                                listings.map((listing) => {
                                    return (
                                        <ListingLink listing={listing} url={"/listing/"}/>
                                    )
                                })
                            }
                        </InfiniteScroll>
                    ) : (
                        <div className={"flex-horizontally-center"}>
                            <Loader/>
                        </div>
                    )
                }
            </div>

            <Footer/>
        </>
    );
}

export default IndexPage;
