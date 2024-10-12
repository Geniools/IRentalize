import {createBrowserRouter} from "react-router-dom"

// Import the URL paths
import * as paths from "@/lib/constants/url_paths"

import MainLayout from "@/layout/MainLayout";
import NotFoundPage from "@/pages/main/404NotFoundPage/404NotFoundPage"
import IndexPage from "@/pages/main/IndexPage"
import ContactUsPage from "@/pages/main/ContactUsPage/ContactUsPage";


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
            // {
            //     path: paths.LISTING_DETAILS_URL,
            //     element: <ListingDetailsPage/>
            // },
            // {
            //     path: paths.LISTING_ALL_IMAGES_URL,
            //     element: <ListingAllImagesPage/>
            // },
            // {
            //     path: paths.ABOUT_US_URL,
            //     element: <AboutUsPage/>,
            // },
            // // Chat
            // {
            //     path: paths.CHAT_URL,
            //     element: <ChatPage/>,
            //     children: [
            //         {
            //             path: paths.CHAT_HOST_URL,
            //             element: <ChatPage chatType={"host"}/>,
            //         },
            //         {
            //             path: paths.CHAT_GUEST_URL,
            //             element: <ChatPage chatType={"guest"}/>,
            //         },
            //         {
            //             path: paths.CHAT_HOST_ROOM_URL,
            //             element: <ChatPage chatType={"host"}/>,
            //         },
            //         {
            //             path: paths.CHAT_GUEST_ROOM_URL,
            //             element: <ChatPage chatType={"guest"}/>,
            //         },
            //     ]
            // },
            // User Dashboard
            // {
            //     path: paths.ACCOUNT_URL,
            //     element: <UserDashboardPage/>,
            //     children: [
            //         {
            //             path: paths.USER_DETAILS_URL,
            //             element: <UserDetailsPage/>
            //         },
            //         {
            //             path: paths.USER_ORDERS_URL,
            //             element: <UserOrdersPage/>
            //         },
            //         {
            //             path: paths.USER_POSTS_URL,
            //             element: <UserPostsPage/>
            //         },
            //         {
            //             path: paths.USER_POST_DETAILS_URL,
            //             element: <UserPostDetailsPage/>
            //         },
            //         {
            //             path: paths.USER_RESERVATION_URL,
            //             element: <UserReservationPage/>
            //         },
            //         {
            //             path: paths.USER_RECENTLY_VIEWED_URL,
            //             element: <UserRecentlyViewedPage/>
            //         },
            //         {
            //             path: paths.USER_CHANGE_PROFILE_PICTURE_URL,
            //             element: <UserChangeProfilePicture/>
            //         },
            //     ]
            // },
            // // Authentication
            // {
            //     path: 'auth',
            //     element: <p>TODO: Add element</p>,
            //     children: [
            //         {
            //             path: paths.LOGIN_URL,
            //             element: <UserLoginPage/>,
            //         },
            //         {
            //             path: paths.SIGNUP_URL,
            //             element: <UserRegistrationPage/>,
            //         },
            //         {
            //             path: paths.ACTIVATE_URL,
            //             element: <UserActivatePage/>,
            //         },
            //         {
            //             path: paths.PASSWORD_RESET_URL,
            //             element: <ResetPasswordPage/>,
            //         },
            //         {
            //             path: paths.PASSWORD_RESET_CONFIRM_URL,
            //             element: <ResetPasswordConfirmPage/>,
            //         },
            //         {
            //             path: paths.EMAIL_RESET_URL,
            //             element: <ResetEmailPage/>,
            //         },
            //         {
            //             path: paths.EMAIL_RESET_CONFIRM_URL,
            //             element: <ResetEmailConfirmPage/>,
            //         },
            //     ]
            // }
        ]
    }
])
