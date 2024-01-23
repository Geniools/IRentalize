const getMainDomain = () => {
    const domain = window.location.hostname;
    const parts = domain.split('.');

    const returnObject = {
        main_domain: parts.slice(-1)[0],
        port: window.location.port,
        full_url: "http://localhost:" + window.location.port
    }

    // If the domain is localhost, return localhost
    if (parts.slice(-1)[0] === 'localhost') {
        return returnObject;
    }

    returnObject.main_domain = parts.slice(-2).join('.');
    returnObject.full_url = returnObject.main_domain + ":" + window.location.port;

    // If the port is 80 or 443, don't include it in the full_url
    if (['80', '443'].includes(window.location.port)) {
        returnObject.full_url = returnObject.main_domain;
    }

    return returnObject;
}

export default getMainDomain;