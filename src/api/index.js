import {axiosInstanceWithAuth, axiosInstanceWithoutAuth} from "./axios"

/**
 * Calls endpoint for registering a new user.
 * NOTE: You should call endpoint for creating
 * a new profile after this is done
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const registerUser = ({username, email, password}) => {
	console.log({username, email, password}, "{username, email, password}")
	return axiosInstanceWithoutAuth.post("/api/auth/local/register", {
		username: username,
		email: email,
		password: password
	})
}

/**
 *    Calls endpoing for creation of a new profile
 *    for the user after registration
 *
 * @param {String} name - TODO: is name username?
 * @param {Number} company - ID of the company
 * @param {Number} user - ID of the user
 * @param {String} userRole - either 'comapny_user' or 'company_admin'
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createProfile = ({name, company, user, userRole}) => {
	return axiosInstanceWithAuth.post("/api/profiles", {
		name,
		company,
		user,
		userRole
	})
}

/**
 *    Calls endpoing for creation of a new company
 *  after registration and before
 *  creation of a new profile
 *
 * @param {String} name - company name
 * @param {String} slug - company slug
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createCompany = ({name, slug}) => {
	return axiosInstanceWithAuth.post("/api/profiles", {
		name,
		slug
	})
}

/**
 * GETs all companies
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAllCompanies = () => {
	return axiosInstanceWithoutAuth.get("/api/companies")
}

/**
 * Calls endpoint for logging in user
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const loginUser = ({email, password}) => {
	console.log(axiosInstanceWithoutAuth)

	return axiosInstanceWithoutAuth.post("/api/auth/local", {
		identifier: email,
		password: password
	})
}


/**
 * Removes JWT from localStorage, to logout a user.
 * This way it prevents authorization
 */
export const logoutUser = () => {
	console.log("logoutUser")
	localStorage.removeItem("token")
}

/**
 *
 * @param name {String}
 * @param company {Number}
 * @param user {Number}
 * @param userRole {String}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createNewProfile = ({name, company, user, userRole}) => {
	console.log("{name, company, user, userRole}", {name, company, user, userRole})
	return axiosInstanceWithAuth.post("/api/profiles", {
		data: {
			name,
			company,
			user,
			userRole
		}
	})
}

export const fetchQuestions = () => {
	return axiosInstanceWithAuth.get("/api/questions", {
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			// "Authorization": localStorage.getItem("token")
		},
	})
}