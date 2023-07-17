import React, {Fragment} from 'react';
import Icon from "./Icon";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../actions/auth";

const Header = ({
                    logout,
                    isAuthenticated,
                    showIcon = true,
                    showLinks = true,
                    showSearch = true,
                    showAuth = true
                }) => {

    const authLinks = (
        <Fragment>
            <a className={"header-green-link"} href="" onClick={logout}>
                LOG OUT
            </a>
        </Fragment>
    )
    
    const guestLinks = (
        <Link className={"header-green-link"} to={"/account/login/"}>
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
                <div className={"header-panel"}>
                    <ul>
                        <li><Link to={""}>Housing</Link></li>
                        <li><Link to={""}>Furniture</Link></li>
                        <li><Link to={""}>Accessories</Link></li>
                        <li><Link to={""}>Contact Us</Link></li>
                    </ul>
                </div>
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
                    isAuthenticated ? authLinks : guestLinks
                )}
            </div>
        </header>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Header);
