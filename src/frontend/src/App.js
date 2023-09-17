import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./utils/store/store";

// Import the pages
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserLoginPage from "./pages/authentication/UserLoginPage";
import UserRegistrationPage from "./pages/authentication/UserRegistrationPage";
import UserDashboardPage from "./pages/userdashboard/UserDashboardPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/authentication/ResetPasswordConfirmPage";
import Layout from "./hocs/Layout";
import {
    ABOUT_US_URL,
    ACCOUNT_URL,
    ACTIVATE_URL,
    CONTACT_US_URL,
    EMAIL_RESET_CONFIRM_URL,
    EMAIL_RESET_URL,
    HOME_URL,
    LOGIN_URL,
    PASSWORD_RESET_CONFIRM_URL,
    PASSWORD_RESET_URL,
    SIGNUP_URL,
    USER_DETAILS_URL,
    USER_ORDERS_URL,
    USER_POST_DETAILS_URL,
    USER_POSTS_URL,
    USER_RECENTLY_VIEWED_URL
} from "./UrlPaths";
import UserActivatePage from "./pages/authentication/UserActivatePage";
import ContactUsPage from "./pages/ContactUsPage";
import ResetEmailPage from "./pages/authentication/ResetEmailPage";
import ResetEmailConfirmPage from "./pages/authentication/ResetEmailConfirmPage";
import UserDetailsPage from "./pages/userdashboard/UserDetailsPage";
import UserPostsPage from "./pages/userdashboard/UserPostsPage";
import UserRecentlyViewedPage from "./pages/userdashboard/UserRecentlyViewedPage";
import UserOrdersPage from "./pages/userdashboard/UserOrdersPage";
import UserPostDetailsPage from "./pages/userdashboard/UserPostDetailsPage";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        {/* Pages */}
                        <Route exact path={HOME_URL} element={<IndexPage/>}/>
                        <Route exact path={ABOUT_US_URL} element={<AboutUsPage/>}/>
                        <Route exact path={CONTACT_US_URL} element={<ContactUsPage/>}/>

                        {/* User Dashboard */}
                        <Route path={ACCOUNT_URL} element={<UserDashboardPage/>}>
                            <Route exact path={USER_DETAILS_URL} element={<UserDetailsPage/>}/>
                            <Route exact path={USER_ORDERS_URL} element={<UserOrdersPage/>}/>
                            <Route exact path={USER_POSTS_URL} element={<UserPostsPage/>}/>
                            <Route exact path={USER_POST_DETAILS_URL} element={<UserPostDetailsPage/>}/>
                            <Route exact path={USER_RECENTLY_VIEWED_URL} element={<UserRecentlyViewedPage/>}/>
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
                        <Route path="*" element={<h1>404 Not Found :(</h1>}/>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;