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
                    <div style={{width: "30%"}}>
                        <img src="/static/assets/sorry_not_sorry.jpg" alt="Sorry Not Sorry"/>
                    </div>
                </div>

                <div className="flex-center">
                    <h1>
                        404 Not Found :(
                    </h1>
                </div>
                
                <br/>
            </div>

            <Footer/>
        </>
    )
}

export default NotFoundPage;