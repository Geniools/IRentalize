import React from 'react';

import MainDomainLink from "../MainDomainLink/MainDomainLink";

import styles from './IRentalizeIcon.module.css';

const IRentalizeIcon = () => {
    return (
        <MainDomainLink className={styles.icon} to="/">
            <img src="/static/assets/favicon.png" alt="IRentalize"/>
        </MainDomainLink>
    );
}

export default IRentalizeIcon;