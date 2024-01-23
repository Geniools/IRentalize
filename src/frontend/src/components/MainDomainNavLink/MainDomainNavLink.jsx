import React from "react";
import {NavLink} from "react-router-dom";

import getMainDomain from "../../utils/helpers/getMainDomain";

const MainDomainNavLink = ({to, className, children}) => {
    const mainDomain = getMainDomain();

    // If the current domain is not the main domain, then we need to add the main domain to the link
    if (window.location.hostname !== mainDomain.main_domain) {
        const url = mainDomain.full_url + to;
        return <NavLink className={className} to={url}>{children}</NavLink>;
    }

    // Otherwise, we can just return the link as is
    return (
        <NavLink className={className} to={to}>{children}</NavLink>
    )
}


export default MainDomainNavLink;