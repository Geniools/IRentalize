import {type Listing} from "@/lib/types/listingTypes";
import Loader from "@/components/Loader/Loader"

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

interface ListingLinkProps {
    listing: Listing,
    url: string
}

const ListingLink = (obj: ListingLinkProps) => {
    const {listing, url} = obj

    // Display a loader if the listing is not loaded yet
    if (!listing) {
        return <Loader/>
    }

    const listingUrl = url + listing.id + "/"

    console.log(listing.images)

    return (
        <Card className="min-w-72 max-w-96">
            <CardHeader className={"group/carousel"}>
                <Carousel>
                    <CarouselContent className={"group/carouselContent hover:transition-all"}>
                        {
                            // TODO: Add a default image if there are no images
                            // TODO: Add a loading spinner for the images
                            // TODO: Add max-height to the images
                            listing.images.map((image, index) => {
                                return (
                                    <CarouselItem key={index}>
                                        <img src={image.image} alt={listing.title}/>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>

                    {/* TODO: Add transition animation on hovering */}
                    <CarouselPrevious
                        className={"-left-0 invisible group-hover/carousel:visible transition ease-in-out delay-150"}
                    />
                    <CarouselNext
                        className={"right-0 invisible group-hover/carousel:visible transition ease-in-out delay-150"}
                    />
                </Carousel>
            </CardHeader>

            <CardContent className={"flex flex-col gap-3"}>
                <h1>{listing.title}</h1>
                <pre>{listing.description.slice(0, 100)}...</pre>
                <p>{listing.price} <b><span>&euro;</span></b></p>
                <i><p>{listing.address?.zip_code}</p></i>
            </CardContent>
        </Card>
    )
}

export default ListingLink