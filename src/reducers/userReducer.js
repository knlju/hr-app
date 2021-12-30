import {
	LOGIN_FAIL,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGOUT_FAIL,
	LOGOUT_START,
	LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS,
} from "../actions/actions"

const initialState = {
	isLoading: false,
	isLoggedIn: false,
	user: null,
	error: null,
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
	case LOGIN_START:
		return {
			...state,
			isLoading: true,
		}
	case LOGIN_SUCCESS:
		// console.log(AUTH_SUCCESS)
		return {
			...state,
			isLoading: false,
			isLoggedIn: true,
			user: payload,
		}
	case LOGIN_FAIL:
		// console.log(AUTH_FAIL)
		return {
			...state,
			isLoggedIn: false,
			user: null,
			isLoading: false,
			error: payload,
		}
	case REGISTER_START:
		return {
			...state,
			isLoading: true,
		}
	case REGISTER_SUCCESS:
		// console.log(AUTH_SUCCESS)
		return {
			...state,
			isLoading: false,
			isLoggedIn: true,
			user: payload,
		}
	case REGISTER_FAIL:
		// console.log(AUTH_FAIL)
		return {
			...state,
			isLoggedIn: false,
			user: null,
			isLoading: false,
			error: payload,
		}
	case LOGOUT_START:
		return {
			...state,
			isLoading: true,
		}
	case LOGOUT_SUCCESS:
		return {
			...initialState,
		}
	case LOGOUT_FAIL: {
		return {
			...state,
			isLoading: false,
			error: payload,
		}
	}
	default:
		return state
	}
}
