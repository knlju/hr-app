const actions = {
	LOGIN_START : "LOGIN_START",
	LOGIN_SUCCESS : "LOGIN_SUCCESS",
	LOGIN_ERROR : "LOGIN_ERROR",

	REGISTER_START : "REGISTER_START",
	REGISTER_SUCCESS : "REGISTER_SUCCESS",
	REGISTER_ERROR : "REGISTER_ERROR",

	// TODO: ovaj flow je nepotreban
	LOGOUT_START : "LOGOUT_START",
	LOGOUT_SUCCESS : "LOGOUT_SUCCESS",
	LOGOUT_ERROR : "LOGOUT_ERROR",

	FETCH_COMPANIES_START : "FETCH_COMPANIES_START",
	FETCH_COMPANIES_SUCCESS : "FETCH_COMPANIES_SUCCESS",
	FETCH_COMPANIES_ERROR : "FETCH_COMPANIES_ERROR",

	CREATE_COMPANY_START : "CREATE_COMPANY_START",
	CREATE_COMPANY_SUCCESS : "CREATE_COMPANY_SUCCESS",
	CREATE_COMPANY_ERROR : "CREATE_COMPANY_ERROR",
}

export const loginStart = (payload) => ({
	type: actions.LOGIN_START,
	payload,
})

export const loginSuccess = (payload) => ({
	type: actions.LOGIN_SUCCESS,
	payload,
})

export const loginError = (payload) => ({
	type: actions.LOGIN_ERROR,
	payload,
})


export const registerStart = (payload) => ({
	type: actions.REGISTER_START,
	payload,
})

export const registerSuccess = (payload) => ({
	type: actions.REGISTER_SUCCESS,
	payload,
})

export const registerError = (payload) => ({
	type: actions.REGISTER_ERROR,
	payload,
})

export const logoutStart = () => ({
	type: actions.LOGOUT_START,
})

export const logoutError = () => ({
	type: actions.LOGOUT_ERROR,
})

export const logoutSuccess = () => ({
	type: actions.LOGOUT_SUCCESS,
})

export const fetchCompaniesStart = () => ({
	type: actions.FETCH_COMPANIES_START,
})

export const fetchCompaniesSuccess = (payload) => ({
	type: actions.FETCH_COMPANIES_SUCCESS,
	payload,
})

export const fetchCompaniesError = (payload) => ({
	type: actions.FETCH_COMPANIES_ERROR,
	payload,
})

export const createCompanyStart = (payload) => ({
	type: actions.CREATE_COMPANY_START,
	payload,
})

export const createCompanySuccess = (payload) => ({
	type: actions.CREATE_COMPANY_SUCCESS,
	payload,
})

export const createCompanyError = (payload) => ({
	type: actions.CREATE_COMPANY_ERROR,
	payload,
})

export default actions