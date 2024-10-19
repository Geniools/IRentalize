import {Link} from "react-router-dom";
import {type Listing} from "@/lib/types/listingTypes";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {ImageOffIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ListingLinkProps {
    listing: Listing,
    url: string
}

const ListingCard = (obj: ListingLinkProps) => {
    const {listing, url} = obj
    const hasImages = listing.images.length > 0
    const listingUrl = url + listing.id + "/"

    return (
        <Card className="flex flex-col w-96 min-h-[30rem] overflow-auto">
            <CardHeader className={"group/carousel"}>
                <Carousel>
                    <Link to={listingUrl} className={"z-0"}>
                        <CarouselContent className={"h-60"}>
                            {
                                hasImages ?
                                    listing.images.map((image, index) => (
                                        <CarouselItem key={index} className={"flex justify-center items-center"}>
                                            <img src={image.image} alt={listing.title}/>
                                        </CarouselItem>
                                    ))
                                    :
                                    <CarouselItem className={"w-full flex justify-center items-center"}>
                                        <ImageOffIcon size={"100"}/>
                                    </CarouselItem>

                            }
                        </CarouselContent>
                    </Link>

                    {
                        hasImages ? (
                            <span className={"z-10"}>
                                <CarouselPrevious
                                    className={"-left-0 invisible transition opacity-0 ease-in-out group-hover/carousel:visible group-hover/carousel:opacity-100"}
                                />
                                <CarouselNext
                                    className={"right-0 invisible transition opacity-0 ease-in-out group-hover/carousel:visible group-hover/carousel:opacity-100"}
                                />
                            </span>
                        ) : null
                    }
                </Carousel>
            </CardHeader>

            <CardContent className={"flex flex-col gap-3"}>
                <h1>{listing.title}</h1>
                <pre>{listing.description.slice(0, 100)}...</pre>
                <p>{listing.price} <b><span>&euro;</span></b></p>
                <i><p>{listing.address?.zip_code}</p></i>
            </CardContent>

            <CardFooter className={"flex-1 flex items-end"}>
                <Button variant={"default"} className={"w-full"}>
                    <Link to={listingUrl} className={"w-full"}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ListingCard