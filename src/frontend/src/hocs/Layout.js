import React, {useEffect} from 'react';
import {checkAuthenticated, load_user} from "../actions/auth";
import {connect} from "react-redux";

const Layout = ({checkAuthenticated, load_user, children}) => {
    useEffect(async () => {
        checkAuthenticated();
        await load_user();
    }, []);

    return (
        <>
            {/*<Header/>*/}
            {children}
        </>
    )
}

export default connect(null, {checkAuthenticated, load_user})(Layout);