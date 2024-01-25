import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../../actions/auth";

import {ACCOUNT_URL, LOGIN_URL} from "../../../utils/constants/URL_PATHS";

const useLoggingButton = (showLogout) => {
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user ? state.auth.user : {},
    }))

    // Default object -> button that redirects to the login page.
    const returnObject = {
        to: LOGIN_URL,
        onClick: undefined,
        text: "LOG IN",
    }

    // If the user is not authenticated, then return the default object.
    if (!isAuthenticated) {
        return returnObject;
    }
    // If the user is authenticated, but the "LOG OUT" button must be shown, then return the "LOG OUT" button. (showLogout = true)
    if (showLogout) {
        return {
            to: "#",
            onClick: () => dispatch(logout()),
            text: "LOG OUT",
        }
    }
    // Otherwise, return the button that redirects to the account page.
    return {
        ...returnObject,
        to: ACCOUNT_URL,
        text: user.username ? user.username : user.first_name,
    }
}

export default useLoggingButton;