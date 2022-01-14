export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"

export const REGISTER_START = "REGISTER_START"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAIL = "REGISTER_FAIL"

// TODO: ovaj flow je nepotreban
export const LOGOUT_START = "LOGOUT_START"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAIL = "LOGOUT_FAIL"

export const FETCH_COMPANIES_START = "FETCH_COMPANIES_START"
export const FETCH_COMPANIES_SUCCESS = "FETCH_COMPANIES_SUCCESS"
export const FETCH_COMPANIES_ERROR = "FETCH_COMPANIES_ERROR"

export const CREATE_COMPANY_START = "CREATE_COMPANY_START"
export const CREATE_COMPANY_SUCCESS = "CREATE_COMPANY_SUCCESS"
export const CREATE_COMPANY_ERROR = "CREATE_COMPANY_ERROR"

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
	type: REGISTER_START,
	payload,
})

export const registerSuccess = (payload) => ({
	type: REGISTER_SUCCESS,
	payload,
})

export const registerFail = (payload) => ({
	type: REGISTER_FAIL,
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

export const fetchCompaniesStart = () => ({
	type: FETCH_COMPANIES_START,
})

export const fetchCompaniesSuccess = (payload) => ({
	type: FETCH_COMPANIES_SUCCESS,
	payload,
})

export const fetchCompaniesError = (payload) => ({
	type: FETCH_COMPANIES_ERROR,
	payload,
})

export const createCompanyStart = (payload) => ({
	type: CREATE_COMPANY_START,
	payload,
})

export const createCompanySuccess = (payload) => ({
	type: CREATE_COMPANY_SUCCESS,
	payload,
})

export const createCompanyError = (payload) => ({
	type: CREATE_COMPANY_ERROR,
	payload,
})