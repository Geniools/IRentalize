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
import Layout from "./hocs/Layout";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<IndexPage/>}/>
                        <Route exact path="/about-us/" element={<AboutUsPage/>}/>
                        {/* Authentication */}
                        <Route exact path="/account/" element={<UserDashboardPage/>}/>
                        <Route exact path="/account/login/" element={<UserLoginPage/>}/>
                        <Route exact path="/account/register/" element={<UserRegistrationPage/>}/>
                        <Route exact path="/account/password-reset/" element={<ResetPasswordPage/>}/>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;