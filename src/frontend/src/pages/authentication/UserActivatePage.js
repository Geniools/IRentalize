import React, {useEffect, useState} from 'react';
import {verify} from "../../actions/auth";
import {connect} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {LOGIN_URL} from "../../UrlPaths";

const UserActivatePage = ({verify, isAuthenticated}) => {
    useEffect(() => {
        document.title = "Activate Account";
    }, []);

    const {uid, token} = useParams();
    const [verified, setVerified] = useState(false);

    const verifyAccount = () => {
        verify(uid, token);
        setVerified(true);
    }

    if (verified) {
        return <Navigate to={LOGIN_URL}/>
    }

    return (
        <div className="page-container">
            <div className="authentication-form">
                <div className="authentication-header">
                    <h1>Activate your account</h1>
                    <h2>Click the button below to activate your account</h2>
                </div>

                <button
                    type={"submit"}
                    className={"authentication-input"}
                    onClick={verifyAccount}
                >
                    ACTIVATE
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {verify})(UserActivatePage);