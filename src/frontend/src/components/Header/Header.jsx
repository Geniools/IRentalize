import React, {Fragment, useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {connect} from "react-redux";

import {logout} from "../../actions/auth";
import {loadListings} from "../../actions/listing";

import ListingSearchForm from "../ListingSearchForm/ListingSearchForm";
import {ACCOUNT_URL, CONTACT_US_URL, LOGIN_URL} from "../../URL_PATHS";

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

    useEffect(() => {
        console.log("Header useEffect");
        loadListings({});
    }, []);

    const navigator = useNavigate();
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

    const handleLoadListings = event => {
        navigator('/');

        event.preventDefault();

        const filters = {
            category_name: event.target.text
        }

        loadListings({filters: filters});

    }

    return (
        <header>
            {showIcon && (
                <div className={"header-panel"}>
                    <Link className="icon" to="/" onClick={loadListings}>
                        <img src="/static/assets/favicon.png" alt="IRentalize"/>
                    </Link>
                </div>
            )}

            {showLinks && (
                <nav className={"header-panel"}>
                    <ul>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to="/" onClick={handleLoadListings}>Housing</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to="/" onClick={handleLoadListings}>Furniture</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to="/" onClick={handleLoadListings}>Accessories</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={CONTACT_US_URL}>Contact Us</NavLink>
                        </li>
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

export default connect(mapStateToProps, {logout, loadListings})(Header);
