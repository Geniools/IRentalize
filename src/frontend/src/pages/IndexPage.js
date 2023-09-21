import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import {useNavigate} from "react-router-dom";
import {USER_POSTS_URL} from "../UrlPaths";

const IndexPage = () => {
    const navigate = useNavigate();

    const handleExploreNow = () => {
        navigate(USER_POSTS_URL);
    }

    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <BackgroundImage src={'/static/assets/index_background.jpg'} children={
                    <>
                        <div className="dashboard-right-panel-header">
                            <h1>IRentalize</h1>
                        </div>

                        <button onClick={handleExploreNow}>Explore now</button>
                    </>
                }/>
            </div>

            <Footer/>
        </>
    );
}

export default IndexPage;
