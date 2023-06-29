import React, {Component} from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class AboutUsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header/>
                <h1>About Us Page</h1>
                <Footer/>
            </>
        );
    }
}
