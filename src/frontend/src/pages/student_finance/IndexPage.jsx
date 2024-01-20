import React from 'react';

import Header from "../../components/Header/Header";
import RequestForm from "./partials/RequestForm/RequestForm";
import Footer from "../../components/Footer/Footer";

const IndexPage = () => {
    return (
        <>
            <div className='page-container'>
                <Header/>
                <RequestForm/>
            </div>
            <Footer/>
        </>
    )
}

export default IndexPage;