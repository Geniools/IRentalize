import {combineReducers} from "redux";
import auth from "./auth";
import listing from "./listing";

export default combineReducers({
    auth,
    listing,
});