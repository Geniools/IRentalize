import {APPS} from "../constants/SUBDOMAINS.js"

export const getApp = () => {
    // Get the current subdomain
    const currentSubdomain = getSubdomain()
    // Get the app from the list of apps
    const app = APPS.find(app => app.subdomain === currentSubdomain)
    // If the app is not found, return the main app
    if (!app) {
        return APPS.find(app => app.main)!.app
    }
    // Return the app
    return app.app
}

const getSubdomain = () => {
    // Get and return the current subdomain
    return window.location.hostname.split('.')[0]
}