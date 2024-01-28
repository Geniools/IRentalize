import React, {useEffect} from 'react';
import {connect} from "react-redux";

import {checkAuthenticated, loadUser} from "../actions/auth";

const Layout = ({checkAuthenticated, load_user, children}) => {
    useEffect(async () => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <>
            {/*<Header/>*/}
            {children}
        </>
    )
}

export default connect(null, {checkAuthenticated, load_user: loadUser})(Layout);