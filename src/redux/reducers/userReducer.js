import actions from "../actions/actions"

const initialState = {
	isLoading: false,
	isLoggedIn: false,
	user: null,
	error: null,
	// TODO: da li da ubacim profil u poseban reducer?
	profile: null,
	image: null
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
		return {
			...state,
			isLoading: false,
			isLoggedIn: true,
			user: payload,
		}
	case actions.REGISTER_ERROR:
		console.log(payload)
		return {
			...initialState,
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
	case actions.CREATE_PROFILE_START:
		return {
			...state,
			isLoading: true,
		}
	case actions.CREATE_PROFILE_SUCCESS:
		return {
			...state,
			isLoading: false,
			profile: payload
		}
	case actions.CREATE_PROFILE_ERROR: {
		return {
			...state,
			isLoading: false,
			error: payload,
		}
	}
	case actions.UPLOAD_IMAGE_START:
		return {
			...state,
			isLoading: true,
		}
	case actions.UPLOAD_IMAGE_SUCCESS:
		return {
			...state,
			isLoading: false,
			image: payload.data[0]
		}
	case actions.UPLOAD_IMAGE_ERROR: {
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
