import {createBrowserRouter} from "react-router-dom"

// Import the URL paths
import * as paths from "@/lib/constants/url_paths"

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
