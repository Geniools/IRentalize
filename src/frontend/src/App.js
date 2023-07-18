import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";

// Import the pages
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserLoginPage from "./pages/authentication/UserLoginPage";
import UserRegistrationPage from "./pages/authentication/UserRegistrationPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/authentication/ResetPasswordConfirmPage";
import Layout from "./hocs/Layout";
import {ABOUT_US_URL, ACCOUNT_URL, ACTIVATE_URL, CONTACT_US_URL, HOME_URL, LOGIN_URL, PASSWORD_RESET_CONFIRM_URL, PASSWORD_RESET_URL, SIGNUP_URL} from "./UrlPaths";
import UserActivatePage from "./pages/authentication/UserActivatePage";
import ContactUsPage from "./pages/ContactUsPage";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path={HOME_URL} element={<IndexPage/>}/>
                        <Route exact path={ABOUT_US_URL} element={<AboutUsPage/>}/>
                        <Route exact path={CONTACT_US_URL} element={<ContactUsPage/>}/>
                        {/* Authentication */}
                        {/*TODO: Change the paths in the rest of the application*/}
                        <Route exact path={ACCOUNT_URL} element={<UserDashboardPage/>}/>
                        <Route exact path={LOGIN_URL} element={<UserLoginPage/>}/>
                        <Route exact path={SIGNUP_URL} element={<UserRegistrationPage/>}/>
                        <Route exact path={ACTIVATE_URL} element={<UserActivatePage/>}/>
                        <Route exact path={PASSWORD_RESET_URL} element={<ResetPasswordPage/>}/>
                        <Route exact path={PASSWORD_RESET_CONFIRM_URL} element={<ResetPasswordConfirmPage/>}/>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;