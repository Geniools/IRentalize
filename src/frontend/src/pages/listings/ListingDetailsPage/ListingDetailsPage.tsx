import {useParams} from "react-router-dom"
import useListingData from "@/hooks/useListingData"

import NotFoundContent from "@/pages/main/partials/404NotFoundContent"
import Loader from "@/components/Loader/Loader"

import ListingHeader from "@/pages/listings/ListingDetailsPage/partials/ListingHeader"
import ImageGallery from "@/pages/listings/ListingDetailsPage/partials/ImageGallery"
import LocationCard from "@/pages/listings/ListingDetailsPage/partials/LocationCard"
import InfoCard from "@/pages/listings/ListingDetailsPage/partials/InfoCard"
import ContactCard from "@/pages/listings/ListingDetailsPage/partials/ContactCard"


const ListingDetailsPage = () => {
    const {id} = useParams()
    const {data, isLoading, isError} = useListingData(Number(id));

    if (isLoading) {
        // TODO: Replace with a skeleton loader
        return <div className="flex justify-center"><Loader/></div>
    }

    if (isError || !data) {
        return <NotFoundContent pageName={"Such listing"}/>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="mx-auto">
                <ListingHeader name={data.name} category={data.category}/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <ImageGallery images={data.images?.map(img => img.image)}/>
                    </div>

                    <div className="space-y-6">
                        <LocationCard address={data.address}/>
                        <InfoCard content={data.content}/>
                        <ContactCard listingId={Number(id)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingDetailsPage