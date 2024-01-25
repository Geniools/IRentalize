import React from 'react';

import Header from "../../components/Header/Header";
import RequestForm from "./partials/RequestForm/RequestForm";
import Footer from "../../components/Footer/Footer";

const IndexPage = () => {
    return (
        <>
            <Header/>

            <div className='page-container'>
                <RequestForm/>
            </div>
            
            <Footer/>
        </>
    )
}

export default IndexPage;