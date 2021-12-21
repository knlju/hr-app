import {LOGIN_USER} from "../actions/actions"

const initialState = null

const user = (state = initialState, action) => {
	switch (action.type) {
	case LOGIN_USER: {
		console.log("action", action)
		return action.payload
	}
	default:
		return state
	}
}

export default user