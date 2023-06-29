import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

// Import the components
import AboutUsPage from "./AboutUsPage";
import Header from "./Header";
import Footer from "./Footer";
import Icon from "./Icon";

function IndexPage() {
    return (
        <>
            <Header/>
            <h1>Index page</h1>
            <Icon/>
            <Footer/>
        </>
    );
}

export default function HomePage() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<IndexPage/>}/>
                <Route exact path="/about-us/" element={<AboutUsPage/>}/>
            </Routes>
        </Router>
    );
}
