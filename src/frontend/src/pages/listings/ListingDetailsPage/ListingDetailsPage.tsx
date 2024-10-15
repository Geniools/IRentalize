import {useParams} from "react-router-dom";

const ListingDetailsPage = () => {
    const {id} = useParams()

    // TODO: Fetch listing details from the backend using the id


    return (
        <div>
            ListingDetailsPage
        </div>
    )
}

export default ListingDetailsPage