import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_URL, USER_POSTS_URL} from "../UrlPaths";

const IndexPage = () => {
    const navigate = useNavigate();

    const handleExploreNow = () => {
        // TODO: Navigate to the search page
        navigate(USER_POSTS_URL);
    }

    const handleJoinUs = () => {
        navigate(LOGIN_URL);
    }

    return (
        <>
            <Header/>

            <div className="content-wrapper">
                <BackgroundImage src={'/static/assets/index_background.jpg'} children={
                    <div className="section index-info-section index-info-text-wrapper flex-left-content">
                        <div className="dashboard-right-panel-header">
                            <h1>IRentalize</h1>
                        </div>

                        <div>
                            <p>
                                Find the perfect items for your needs with IRentalize, the premier rental marketplace in Emmen.
                            </p>
                        </div>

                        <div>
                            <button type="button" onClick={handleExploreNow}>Explore now</button>
                            &nbsp;
                            <button type="button" className="warning" onClick={handleJoinUs}>Join Us</button>
                        </div>
                    </div>
                }/>

                <div className="section index-info-section index-info-text-wrapper flex-right-content">
                    <div className="dashboard-right-panel-header">
                        <h1>How it works</h1>
                    </div>

                    <div>
                        <p>
                            IRentalize is a rental marketplace where you can rent items from other people in your area.
                        </p>
                    </div>
                </div>

                <div className="section index-info-section">
                    <Link to="">
                        <div className="index-div-link">
                            <img src="/static/assets/house-keys.jpg" alt="Image"/>
                            <h2>Explore Housing Options</h2>
                            <img src="/static/assets/right-arrow.png" alt=">"/>
                        </div>
                    </Link>

                    <Link to="">
                        <div className="index-div-link">
                            <img src="/static/assets/house-keys.jpg" alt="Image"/>
                            <h2>Explore Housing Options</h2>
                            <img src="/static/assets/right-arrow.png" alt=">"/>
                        </div>
                    </Link>

                    <Link to="">
                        <div className="index-div-link">
                            <img src="/static/assets/house-keys.jpg" alt="Image"/>
                            <h2>Explore Housing Options</h2>
                            <img src="/static/assets/right-arrow.png" alt=">"/>
                        </div>
                    </Link>
                </div>

                <div className="section index-info-section flex-center">
                    <div className="dashboard-right-panel-header">
                        <h1>Join Us!</h1>
                    </div>

                    <div>
                        <p className="flex-center">
                            Ready to ditch the boring shopping and switch to the world of rentals? Take the first step into a world of endless possibilities. Don’t be
                            stuck with stuff—join the IRentalize revolution today!
                        </p>
                    </div>

                    <div>
                        <button type="button" className="warning" onClick={handleJoinUs}>Join Us</button>
                    </div>
                </div>

            </div>

            <Footer/>
        </>
    );
}

export default IndexPage;
