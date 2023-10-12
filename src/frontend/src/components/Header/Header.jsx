import React, {Fragment, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

import "./Header.css";

import {ACCOUNT_URL, CONTACT_US_URL, LOGIN_URL} from "../../URL_PATHS";
import ListingSearchForm from "../ListingSearchForm/ListingSearchForm";

const Header = ({
                    logout,
                    user,
                    isAuthenticated,
                    showIcon = true,
                    showLinks = true,
                    showSearch = true,
                    showAuth = true,
                    showLogout = false
                }) => {
    const [showSearchForm, setShowSearchForm] = useState(false);

    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
    }

    const authLink = () => {
        if (showLogout) {
            return (
                <Fragment>
                    <a className={"header-green-link"} href="" onClick={logout}>
                        LOG OUT
                    </a>
                </Fragment>
            )
        } else {
            const output = user.username ? user.username : user.first_name;
            return (
                <Link className={"header-green-link"} to={ACCOUNT_URL}>
                    {output}
                </Link>
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
                    <a className="icon" href="/">
                        <img src="/static/assets/favicon.png" alt="IRentalize"/>
                    </a>
                </div>
            )}

            {showLinks && (
                <nav className={"header-panel"}>
                    <ul>
                        <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={""}>Housing</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={""}>Furniture</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={""}>Accessories</NavLink></li>
                        <li><NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={CONTACT_US_URL}>Contact Us</NavLink></li>
                    </ul>
                </nav>
            )}

            <div className={"header-panel"}>
                {showSearch && (
                    <button className={"header-green-link"} onClick={toggleSearchForm}>
                        &#128269;
                    </button>
                )}

                <select>
                    <option value="english">English</option>
                    <option value="dutch">Nederlands</option>
                </select>

                {showAuth && (
                    isAuthenticated ? authLink() : guestLink
                )}
            </div>

            {showSearchForm && <ListingSearchForm isActive={showSearchForm}/>}
        </header>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user ? state.auth.user : {},
});

export default connect(mapStateToProps, {logout})(Header);
