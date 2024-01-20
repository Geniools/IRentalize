import React from 'react';
import {NavLink} from "react-router-dom";

import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Terms of Use</NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Privacy Policy</NavLink>
            </div>
            
            <div className={styles.copyrightContainer}>
                &copy;{new Date().getFullYear()} IRentalize
            </div>
        </footer>
    )
}

export default Footer;