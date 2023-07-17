import React, {useState} from 'react';
import {verify} from "../../actions/auth";
import {connect} from "react-redux";
import {Navigate, useParams} from "react-router-dom";

const UserActivatePage = (verify) => {
    const {uid, token} = useParams();
    const [verified, setVerified] = useState(false);

    const verifyAccount = () => {
        verify(uid, token);
        setVerified(true);
    }

    if (verified) {
        return <Navigate to={"/account/login/"}/>
    }

    return verifyAccount();
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {verify})(UserActivatePage);