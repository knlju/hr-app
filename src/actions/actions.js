export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const REGISTER_START = "REGISTER_START"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"
export const LOGOUT_START = "LOGOUT_START"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAIL = "LOGOUT_FAIL"

export const loginStart = (payload) => ({
	type: LOGIN_START,
	payload,
})

export const loginSuccess = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
})

export const loginFail = (payload) => ({
	type: LOGIN_FAIL,
	payload,
})


export const registerStart = (payload) => ({
	type: LOGIN_START,
	payload,
})

export const registerSuccess = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
})

export const registerFail = (payload) => ({
	type: LOGIN_FAIL,
	payload,
})

export const logoutStart = () => ({
	type: LOGOUT_START,
})

export const logoutFail = () => ({
	type: LOGOUT_FAIL,
})

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS,
})
