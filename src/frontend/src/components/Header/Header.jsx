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
    console.log({loggingButton});

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
                        <div className={"header-panel"}>
                            <NavBar/>
                        </div>
                    )}

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

                    <div className="header-panel">
                        {showAuth && (
                            <MainDomainLink className={"header-green-link header-green-link-button"} to={loggingButton.to} onClick={loggingButton.onClick}>
                                {loggingButton.text}
                            </MainDomainLink>
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
    showIcon: PropTypes.bool,
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showAuth: PropTypes.bool,
    showLogout: PropTypes.bool
};

export default Header;
