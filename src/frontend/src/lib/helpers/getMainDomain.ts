const getMainDomain = () => {
    const domain = window.location.hostname;
    const port = window.location.port;
    const protocol = window.location.protocol;
    const parts = domain.split('.');

    const returnObject = {
        main_domain: parts.slice(-1)[0],
        port: port,
        protocol: protocol,
        full_url: protocol + "//" + "localhost" + (port ? ":" + port : "")
    }

    // If the domain is localhost, return localhost
    if (parts.slice(-1)[0] === 'localhost') {
        return returnObject;
    }

    returnObject.main_domain = parts.slice(-3).join('.');
    returnObject.full_url = returnObject.protocol + "//" + returnObject.main_domain;

    // If the port is 80 or 443, don't include it in the full_url
    if (!['80', '443'].includes(window.location.port) && port) {
        returnObject.full_url = returnObject.protocol + "//" + returnObject.main_domain + ":" + port;
    }

    return returnObject;
}

export default getMainDomain;