import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {logout} from "../../actions/auth";
import {loadListings} from "../../actions/listing";

import ListingSearchForm from "../ListingSearchForm/ListingSearchForm";
import {ACCOUNT_URL, CONTACT_US_URL, HOME_URL, LOGIN_URL} from "../../utils/constants/URL_PATHS";

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

    const location = useLocation();
    const searchFormRef = useRef();
    const searchFormButtonRef = useRef();

    const [filters, setFilters] = useState({});
    const [showSearchForm, setShowSearchForm] = useState(false);

    useEffect(() => {
        // Load listings based on the current path
        if (location.pathname === "/") {
            handleLoadListings("");
        } else if (location.pathname === "/housing/") {
            handleLoadListings("housing")
        } else if (location.pathname === "/furniture/") {
            handleLoadListings("furniture")
        } else if (location.pathname === "/accessories/") {
            handleLoadListings("accessories")
        }
    }, [filters]);

    useEffect(() => {
        // Function to handle outside clicks
        const handleOutsideClick = event => {
            if (
                // Check if the click was outside the search form
                searchFormRef.current && !searchFormRef.current.contains(event.target) &&
                // Also check if it was not the button that toggles the search form
                searchFormButtonRef.current && !searchFormButtonRef.current.contains(event.target)
            ) {
                // Hide search form on outside click
                setShowSearchForm(false);
            }
        }

        // Add click event listener to the document
        document.addEventListener('click', handleOutsideClick);

        // Cleanup - remove event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);


    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
    }

    const handleLoadListings = categoryName => {
        if (categoryName === "") {
            loadListings({});
        } else {
            const filters = {
                category_name: categoryName
            }

            loadListings({filters: filters});
        }
    }

    const authLink = () => {
        if (showLogout) {
            return (
                <Fragment>
                    <Link className={"header-green-link"} to="" onClick={logout}>
                        LOG OUT
                    </Link>
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
                    <Link className="icon" to="/" onClick={loadListings}>
                        <img src="/static/assets/favicon.png" alt="IRentalize"/>
                    </Link>
                </div>
            )}

            {showLinks && (
                <nav className={"header-panel"}>
                    <ul>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={HOME_URL + "housing/"}
                                     onClick={() => setFilters("housing")}>Housing</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={HOME_URL + "furniture/"}
                                     onClick={() => setFilters("furniture")}>Furniture</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={HOME_URL + "accessories/"}
                                     onClick={() => setFilters("accessories")}>Accessories</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={CONTACT_US_URL}>Contact Us</NavLink>
                        </li>
                    </ul>
                </nav>
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

                {showAuth && (
                    isAuthenticated ? authLink() : guestLink
                )}
            </div>

            {
                showSearchForm &&
                <div className={`search-form-container ${showSearchForm ? 'active' : ''}`} ref={searchFormRef}>
                    <ListingSearchForm/>
                </div>
            }
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
