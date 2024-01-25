import React from 'react';
import {CSSTransition} from "react-transition-group";
import PropTypes from "prop-types";

import ListingSearchForm from "../ListingSearchForm/ListingSearchForm";
import MainDomainLink from "../MainDomainLink/MainDomainLink";
import HeaderCheckbox from "../HeaderCheckbox/HeaderCheckbox";
import IRentalizeIcon from "../IRentalizeIcon/IRentalizeIcon";
import NavBar from "../NavBar/NavBar";

import useMediaQueryEvent from "./hooks/useMediaQueryEvent";
import useSearchEvent from "./hooks/useSearchEvent";
import useLoggingButton from "./hooks/useLoggingButton";

import "./Header.css";

const Header = ({
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

    // Authentication / Logout button
    const loggingButton = useLoggingButton(showLogout);

    const toggleSearchForm = () => {
        setShowSearchForm(!showSearchForm);
    }

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    }

    return (
        <header>
            {showIcon && (
                <IRentalizeIcon/>
            )}

            <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames={"NavAnimation"}
                unmountOnExit
            >
                <div className="header-links">
                    {showLinks && (
                        <div className={"header-panel flex-horizontally-center"}>
                            <NavBar/>
                        </div>
                    )}

                    <div className={"header-panel-bundle"}>
                        <div className={"header-panel header-panel-search"}>
                            {showSearch && (
                                <button ref={searchFormButtonRef} className={"header-green-link"} onClick={toggleSearchForm}>
                                    &#128269;
                                </button>
                            )}

                            <select>
                                <option value="EN">EN</option>
                                {/*<option value="NL">NL</option>*/}
                            </select>
                        </div>

                        {showAuth && (
                            <div className="header-panel flex-right-content">
                                <MainDomainLink
                                    className={"header-green-link header-green-link-button"}
                                    to={loggingButton.to}
                                    onClick={loggingButton.onClick}>
                                    {loggingButton.text}
                                </MainDomainLink>
                            </div>
                        )}
                    </div>
                </div>
            </CSSTransition>

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
    // Display the icon in the header
    showIcon: PropTypes.bool,
    // Display the links in the header
    showLinks: PropTypes.bool,
    // Display the search form in the header
    showSearch: PropTypes.bool,
    // Display the authentication button in the header
    showAuth: PropTypes.bool,
    // Display the logout button in the header (instead of the button to get a user to the ACCOUNT page)
    showLogout: PropTypes.bool
};

export default Header;
