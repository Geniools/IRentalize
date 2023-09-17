import React, {Fragment} from 'react';
import Icon from "./Icon";
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {ACCOUNT_URL, CONTACT_US_URL, LOGIN_URL} from "../UrlPaths";

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
            let output = user.username ? user.username : user.first_name;
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
                    <Icon/>
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
                    <Link className={"header-green-link"} to={""}>
                        &#128269;
                    </Link>
                )}

                <select>
                    <option value="english">English</option>
                    <option value="dutch">Nederlands</option>
                </select>

                {showAuth && (
                    isAuthenticated ? authLink() : guestLink
                )}
            </div>
        </header>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user ? state.auth.user : {},
});

export default connect(mapStateToProps, {logout})(Header);
