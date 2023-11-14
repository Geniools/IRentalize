import {combineReducers} from "redux";

import auth from "./auth";
import listing from "./listing";
import common from "./common";

export default combineReducers({
    auth,
    listing,
    common
});