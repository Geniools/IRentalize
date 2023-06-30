import React, {Component} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
