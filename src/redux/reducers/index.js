import {combineReducers} from "redux"
import user from "./userReducer"

console.log("reducer", user)

export default combineReducers({user})