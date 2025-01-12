import {createBrowserRouter} from "react-router-dom"

// Import the URL paths
import {urlPaths as paths} from "@/lib/constants"

// Import the layout components
import MainLayout from "@/layout/MainLayout";
import NotFoundPage from "@/pages/main/404NotFoundPage"
import IndexPage from "@/pages/main/IndexPage"
import ContactUsPage from "@/pages/main/ContactUsPage";
import ListingDetailsPage from "@/pages/listings/ListingDetailsPage/ListingDetailsPage";


export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: paths.HOME_URL,
                element: <IndexPage/>,
            },
            {
                path: paths.CONTACT_US_URL,
                element: <ContactUsPage/>,
            },
            {
                path: paths.LISTING_DETAILS_URL,
                element: <ListingDetailsPage/>,
            },
        ]
    }
])
