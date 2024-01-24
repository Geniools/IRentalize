import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {logout} from "../../actions/auth";
import {loadListings} from "../../actions/listing";

import ListingSearchForm from "../ListingSearchForm/ListingSearchForm";
import MainDomainLink from "../MainDomainLink/MainDomainLink";
import HeaderCheckbox from "../HeaderCheckbox/HeaderCheckbox";
import NavBar from "../NavBar/NavBar";

import useMediaQueryEvent from "./hooks/useMediaQueryEvent";
import useSearchEvent from "./hooks/useSearchEvent";

import {ACCOUNT_URL, LOGIN_URL} from "../../utils/constants/URL_PATHS";

import "./Header.css";

const Header = ({
                    logout,
                    loadListings,
                    user,
                    isAuthenticated,
                    showIcon = true,
                    showLinks = true,
                    showSearch = true,
                    showAuth = true,
                    showLogout = false
                }) => {

    // Search form visibility
    const {
        searchFormRef,
        searchFormButtonRef,
        showSearchForm,
        setShowSearchForm
    } = useSearchEvent();

    // Nav bar visibility
    const {
        isNavVisible,
        setIsNavVisible,
        isSmallScreen
    } = useMediaQueryEvent();

    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
    }

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    }

    const authLink = () => {
        if (showLogout) {
            return (
                <Fragment>
                    <MainDomainLink className={"header-green-link"} to="" onClick={logout}>
                        LOG OUT
                    </MainDomainLink>
                </Fragment>
            )
        } else {
            const output = user.username ? user.username : user.first_name;
            return (
                <MainDomainLink className={"header-green-link"} to={ACCOUNT_URL}>
                    {output}
                </MainDomainLink>
            )
        }
    }

    const guestLink = (
        <Link className={"header-green-link"} to={LOGIN_URL}>
            LOG IN
        </Link>
    )

    return (
        <header>
            {showIcon && (
                <div className={"header-panel"}>
                    <MainDomainLink className="icon" to="/" onClick={loadListings}>
                        <img src="/static/assets/favicon.png" alt="IRentalize"/>
                    </MainDomainLink>
                </div>
            )}

            {showLinks && (!isSmallScreen || isNavVisible) && (
                <div className={"header-panel"}>
                    <NavBar/>
                </div>
            )}

            <div className={"header-panel"}>
                {showSearch && (
                    <button ref={searchFormButtonRef} className={"header-green-link"} onClick={toggleSearchForm}>
                        &#128269;
                    </button>
                )}

                <select>
                    <option value="english">English</option>
                    <option value="dutch">Nederlands</option>
                </select>
            </div>

            {showAuth && (
                isAuthenticated ? authLink() : guestLink
            )}

            {showSearchForm && (
                <div className={`search-form-container ${showSearchForm ? 'active' : ''}`} ref={searchFormRef}>
                    <ListingSearchForm/>
                </div>
            )}

            <HeaderCheckbox onChange={toggleNav}/>
        </header>
    );
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    loadListings: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    showIcon: PropTypes.bool,
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showAuth: PropTypes.bool,
    showLogout: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user ? state.auth.user : {},
});

export default connect(mapStateToProps, {logout, loadListings})(Header);
