import React from 'react';
import {NavLink} from "react-router-dom";
import {CONTACT_US_URL} from "../UrlPaths";

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Housing</NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Furniture</NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}> Accessories</NavLink>
                <NavLink to={CONTACT_US_URL} className={({isActive}) => isActive ? 'active-link' : ''}>Contact Us</NavLink>
            </div>
            <div className="footer-links">
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Terms of Use</NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Privacy Policy</NavLink>
            </div>
            <div className="copyright">
                &copy;{new Date().getFullYear()} IRentalize
            </div>
        </footer>
    );
}

export default Footer;
