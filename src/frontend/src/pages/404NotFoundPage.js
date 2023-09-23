import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFoundPage = () => {
    // TODO: Add more styling to this page
    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <div className="flex-center">
                    <h1>
                        404 Not Found :(
                    </h1>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default NotFoundPage;