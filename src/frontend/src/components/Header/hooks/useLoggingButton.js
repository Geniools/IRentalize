import {useDispatch, useSelector} from "react-redux";

import {ACCOUNT_URL, LOGIN_URL} from "../../../utils/constants/URL_PATHS";
import {LOGOUT} from "../../../actions/types";

const useLoggingButton = (showLogout) => {
    const dispatch = useDispatch();
    const {user, isAuthenticated} = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user ? state.auth.user : {},
    }))

    console.log(showLogout);
    const returnObject = {
        to: LOGIN_URL,
        onClick: undefined,
        text: "LOG IN",
    }

    if (!isAuthenticated) {
        return returnObject;
    }

    if (showLogout) {
        return {
            to: "#",
            // TODO: Fix the logout function retrieval
            onClick: () => dispatch({type: LOGOUT}),
            text: "LOG OUT",
        }
    }

    return {
        ...returnObject,
        to: ACCOUNT_URL,
        text: user.username ? user.username : user.first_name,
    }
}

export default useLoggingButton;