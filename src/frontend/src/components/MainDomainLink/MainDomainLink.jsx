import React from "react";
import {Link} from "react-router-dom";

import getMainDomain from "../../utils/helpers/getMainDomain";

const MainDomainLink = ({to, onClick, className, children}) => {
    const mainDomain = getMainDomain();

    // If the current domain is not the main domain, then we need to add the main domain to the link
    if (window.location.hostname !== mainDomain.main_domain) {
        const url = mainDomain.full_url + to;
        return <Link className={className} onClick={onClick} to={url}>{children}</Link>;
    }

    // Otherwise, we can just return the link as is
    return (
        <Link className={className} onClick={onClick} to={to}>{children}</Link>
    )
}


export default MainDomainLink;