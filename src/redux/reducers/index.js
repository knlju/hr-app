import {combineReducers} from "redux"
import user from "./userReducer"
import companies from "./companiesReducer"

console.log("reducer", user)

export default combineReducers({user, companies})