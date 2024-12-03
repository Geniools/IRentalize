import {Link} from "react-router-dom";

import {ImageOffIcon} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import DisplayableBlockNote from "@/components/DisplayableBlockNote/DisplayableBlockNote";


const ListingCard = (props: { listing: Listing, url: string }) => {
    const {listing, url} = props
    const hasImages = listing.images?.length > 0
    const listingUrl = url + listing.id + "/"

    return (
        <Card className="flex flex-col w-96 min-h-[30rem] overflow-auto">
            <CardHeader className={"group/carousel"}>
                <Carousel>
                    <Link to={listingUrl} className={"z-0"}>
                        <CarouselContent className={"h-60"}>
                            {
                                hasImages ?
                                    listing.images?.map((img, index) => (
                                        <CarouselItem key={index} className={"flex justify-center items-center"}>
                                            <img src={img.image} alt={listing.name}/>
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
                <DisplayableBlockNote content={listing.summary}/>
            </CardContent>

            <CardFooter className="flex-1 flex items-end">
                <Button variant="default" className="w-full">
                    <Link to={listingUrl} className="w-full">View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ListingCard