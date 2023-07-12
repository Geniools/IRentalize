import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Import the pages
import IndexPage from "./pages/IndexPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import UserDashboardPage from "./pages/UserDashboardPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<IndexPage/>}/>
                <Route exact path="/account/" element={<UserDashboardPage/>}/>
                <Route exact path="/account/login/" element={<UserLoginPage/>}/>
                <Route exact path="/account/register/" element={<UserRegistrationPage/>}/>
                <Route exact path="/about-us/" element={<AboutUsPage/>}/>
            </Routes>
        </Router>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);