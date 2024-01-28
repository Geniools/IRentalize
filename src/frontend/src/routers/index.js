import React from "react";
import {Route, Routes} from "react-router-dom";

// Import the URL paths
import {
    ABOUT_US_URL,
    ACCOUNT_URL,
    ACTIVATE_URL,
    CHAT_GUEST_ROOM_URL,
    CHAT_GUEST_URL,
    CHAT_HOST_ROOM_URL,
    CHAT_HOST_URL,
    CHAT_URL,
    CONTACT_US_URL,
    EMAIL_RESET_CONFIRM_URL,
    EMAIL_RESET_URL,
    HOME_URL,
    LISTING_ALL_IMAGES_URL,
    LISTING_DETAILS_URL,
    LOGIN_URL,
    PASSWORD_RESET_CONFIRM_URL,
    PASSWORD_RESET_URL,
    SIGNUP_URL,
    USER_CHANGE_PROFILE_PICTURE_URL,
    USER_DETAILS_URL,
    USER_ORDERS_URL,
    USER_POST_DETAILS_URL,
    USER_POSTS_URL,
    USER_RECENTLY_VIEWED_URL,
    USER_RESERVATION_URL
} from "../utils/constants/URL_PATHS";

// Main pages
import IndexPage from "../pages/main/IndexPage/IndexPage";
import AboutUsPage from "../pages/main/AboutUsPage/AboutUsPage";
import ContactUsPage from "../pages/main/ContactUsPage/ContactUsPage";
// Listing pages
import ListingDetailsPage from "../pages/listings/ListingDetailsPage/ListingDetailsPage";
import ListingAllImagesPage from "../pages/listings/ListingAllImagesPage/ListingAllImagesPage";
// Chat
import ChatPage from "../pages/chat/ChatPage";
// User dashboard pages
import UserDashboardPage from "../pages/userdashboard/UserDashboardPage/UserDashboardPage";
import UserDetailsPage from "../pages/userdashboard/UserDetailsPage/UserDetailsPage";
import UserOrdersPage from "../pages/userdashboard/UserOrdersPage/UserOrdersPage";
import UserPostsPage from "../pages/userdashboard/UserPostsPage/UserPostsPage";
import UserPostDetailsPage from "../pages/userdashboard/UserPostDetailsPage/UserPostDetailsPage";
import UserReservationPage from "../pages/userdashboard/UserReservationPage/UserReservationPage";
import UserRecentlyViewedPage from "../pages/userdashboard/UserRecentlyViewedPage/UserRecentlyViewedPage";
import UserChangeProfilePicture from "../pages/userdashboard/UserChangeProfilePicture/UserChangeProfilePicture";
// Authentication pages
import UserLoginPage from "../pages/authentication/UserLoginPage/UserLoginPage";
import UserRegistrationPage from "../pages/authentication/UserRegistrationPage/UserRegistrationPage";
import UserActivatePage from "../pages/authentication/UserActivatePage/UserActivatePage";
import ResetPasswordPage from "../pages/authentication/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordConfirmPage from "../pages/authentication/ResetPasswordConfirmPage/ResetPasswordConfirmPage";
import ResetEmailPage from "../pages/authentication/ResetEmailPage/ResetEmailPage";
import ResetEmailConfirmPage from "../pages/authentication/ResetEmailConfirmPage/ResetEmailConfirmPage";
// Other pages
import NotFoundPage from "../pages/main/404NotFoundPage/404NotFoundPage";

// ========================================================================================================
// Student Finance Main Pages
import IndexPageStudentFinance from "../pages/student_finance/IndexPage";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Pages */}
            <Route exact path={HOME_URL} element={<IndexPage/>}/>
            <Route exact path={HOME_URL + 'housing/'} element={<IndexPage/>}/>
            <Route exact path={HOME_URL + 'furniture/'} element={<IndexPage/>}/>
            <Route exact path={HOME_URL + 'accessories/'} element={<IndexPage/>}/>

            {/* Listing Details */}
            <Route exact path={LISTING_DETAILS_URL} element={<ListingDetailsPage/>}/>
            <Route exact path={LISTING_ALL_IMAGES_URL} element={<ListingAllImagesPage/>}/>

            {/* "Main" Pages */}
            <Route exact path={ABOUT_US_URL} element={<AboutUsPage/>}/>
            <Route exact path={CONTACT_US_URL} element={<ContactUsPage/>}/>

            {/* Chat */}
            <Route exact path={CHAT_URL} element={<ChatPage/>}/>
            <Route exact path={CHAT_HOST_URL} element={<ChatPage chatType={"host"}/>}/>
            <Route exact path={CHAT_GUEST_URL} element={<ChatPage chatType={"guest"}/>}/>
            <Route exact path={CHAT_HOST_ROOM_URL} element={<ChatPage chatType={"host"}/>}/>
            <Route exact path={CHAT_GUEST_ROOM_URL} element={<ChatPage chatType={"guest"}/>}/>

            {/* User Dashboard */}
            <Route path={ACCOUNT_URL} element={<UserDashboardPage/>}>
                <Route exact path={USER_DETAILS_URL} element={<UserDetailsPage/>}/>
                <Route exact path={USER_ORDERS_URL} element={<UserOrdersPage/>}/>
                <Route exact path={USER_POSTS_URL} element={<UserPostsPage/>}/>
                <Route exact path={USER_POST_DETAILS_URL} element={<UserPostDetailsPage/>}/>
                <Route exact path={USER_RESERVATION_URL} element={<UserReservationPage/>}/>
                <Route exact path={USER_RECENTLY_VIEWED_URL} element={<UserRecentlyViewedPage/>}/>
                <Route exact path={USER_CHANGE_PROFILE_PICTURE_URL} element={<UserChangeProfilePicture/>}/>
            </Route>

            {/* Authentication */}
            <Route exact path={LOGIN_URL} element={<UserLoginPage/>}/>
            <Route exact path={SIGNUP_URL} element={<UserRegistrationPage/>}/>
            <Route exact path={ACTIVATE_URL} element={<UserActivatePage/>}/>
            <Route exact path={PASSWORD_RESET_URL} element={<ResetPasswordPage/>}/>
            <Route exact path={PASSWORD_RESET_CONFIRM_URL} element={<ResetPasswordConfirmPage/>}/>
            <Route exact path={EMAIL_RESET_URL} element={<ResetEmailPage/>}/>
            <Route exact path={EMAIL_RESET_CONFIRM_URL} element={<ResetEmailConfirmPage/>}/>

            {/* Other */}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export const StudentFinanceRouter = () => {
    return (
        <Routes>
            <Route path={HOME_URL} element={<IndexPageStudentFinance/>}/>

            {/* Other */}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}