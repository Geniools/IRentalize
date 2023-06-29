import React, {Component} from "react";

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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    renderHomePage() {
        return (
            <>
                <Header/>
                <h1>Index page</h1>
                <Icon/>
                <Footer/>
            </>
        );
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<this.renderHomePage/>}/>
                    <Route exact path="/about-us/" element={<AboutUsPage/>}/>
                </Routes>
            </Router>
        );
    }
}
