import actions from "../actions/actions"

const initialState = {
	isLoading: false,
	isLoggedIn: false,
	user: null,
	error: null,
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
	case actions.LOGIN_START:
		return {
			...state,
			isLoading: true,
		}
	case actions.LOGIN_SUCCESS:
		console.log(actions.LOGIN_SUCCESS)
		return {
			...state,
			isLoading: false,
			isLoggedIn: true,
			user: payload,
		}
	case actions.LOGIN_ERROR:
		console.log(actions.LOGIN_ERROR)
		return {
			...state,
			isLoggedIn: false,
			user: null,
			isLoading: false,
			error: payload,
		}
	case actions.REGISTER_START:
		return {
			...state,
			isLoading: true,
		}
	case actions.REGISTER_SUCCESS:
		// console.log(AUTH_SUCCESS)
		return {
			...state,
			isLoading: false,
			isLoggedIn: true,
			user: payload,
		}
	case actions.REGISTER_ERROR:
		console.log(payload)
		return {
			isLoggedIn: false,
			user: null,
			isLoading: false,
			error: payload,
		}
	case actions.LOGOUT_START:
		return {
			...state,
			isLoading: true,
		}
	case actions.LOGOUT_SUCCESS:
		return {
			...initialState,
		}
	case actions.LOGOUT_ERROR: {
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
