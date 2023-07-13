import React from 'react';
import Icon from "./Icon";
import {Link} from "react-router-dom";

const Header = ({showIcon = true, showLinks = true, showSearch = true, showLogin = true}) => {
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

                {showLogin && (
                    <Link className={"header-green-link"} to={"/account/login/"}>
                        LOG IN
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
