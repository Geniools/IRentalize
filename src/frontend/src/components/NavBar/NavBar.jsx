import React from "react";

import MainDomainNavLink from "../MainDomainNavLink/MainDomainNavLink";

import {CONTACT_US_URL, HOME_URL} from "../../utils/constants/URL_PATHS";

import styles from "./NavBar.module.css";

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <MainDomainNavLink
                        className={({isActive}) => isActive ? 'active-link' : ''}
                        to={HOME_URL + "housing/"}
                    >
                        Housing
                    </MainDomainNavLink>
                </li>
                <li>
                    <MainDomainNavLink
                        className={({isActive}) => isActive ? 'active-link' : ''}
                        to={HOME_URL + "furniture/"}
                    >
                        Furniture
                    </MainDomainNavLink>
                </li>
                <li>
                    <MainDomainNavLink
                        className={({isActive}) => isActive ? 'active-link' : ''}
                        to={HOME_URL + "accessories/"}
                    >
                        Accessories
                    </MainDomainNavLink>
                </li>
                <li>
                    <MainDomainNavLink
                        className={({isActive}) => isActive ? 'active-link' : ''}
                        to={CONTACT_US_URL}>
                        Contact Us
                    </MainDomainNavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;