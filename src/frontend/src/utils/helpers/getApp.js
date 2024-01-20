import {APPS} from "../constants/SUBDOMAINS";

export const getApp = () => {
    // Get the current subdomain
    const currentSubdomain = getSubdomain();
    // Get the app from the list of apps
    const app = APPS.find(app => app.subdomain === currentSubdomain);
    // If the app is not found, return the main app
    if (!app) {
        return APPS.find(app => app.main).app;
    }
    // Return the app
    return app.app;
}

const getSubdomain = () => {
    // Get the current subdomain
    const currentSubdomain = window.location.hostname.split('.')[0];
    // Return the subdomain
    return currentSubdomain;
}