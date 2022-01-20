import {axiosInstanceWithAuth, axiosInstanceWithoutAuth} from "./axios"

const api = {
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
	registerUser: ({username, email, password}) => {
		return axiosInstanceWithoutAuth.post("/api/auth/local/register", {
			username: username,
			email: email,
			password: password
		})
	},

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
	createProfile: ({name, company, user, userRole}) => {
		return axiosInstanceWithAuth.post("/api/profiles", {
			data: {
				name,
				company,
				user,
				userRole
			}
		})
	},

	/**
     *    Calls endpoing for creation of a new company
     *  after registration and before
     *  creation of a new profile
     *
     * @param {String} name - company name
     * @param {String} slug - company slug
     * @returns {Promise<AxiosResponse<any>>}
     */
	createCompany: ({name, slug}) => {
		return axiosInstanceWithAuth.post("/api/companies", {
			data: {
				name,
				slug
			}
		})
	},

	/**
     * GETs all companies
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getAllCompanies: () => {
		return axiosInstanceWithoutAuth.get("/api/companies")
	},

	/**
     * GETs our company
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getOurCompany: () => {
		return axiosInstanceWithAuth.get("/api/companies/7")
	},
	/**
     * Edit our company
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	editOurCompany: (config) => {
		console.log(config)
		return axiosInstanceWithAuth.put("/api/companies/7", {
			data: {
				...config
			}
		})
	},
	/**
     * GETs myProfile
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getMyProfile: () => {
		return axiosInstanceWithAuth.get("/api/users/me")
	},
	/**
     * Edit myProfile
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	editMyProfile: (variables) => {
		console.log("variables")
		console.log(variables)
		return axiosInstanceWithAuth.put("/api/users/" + 999, {}) // example id 17
	},

	/**
     * Calls endpoint for logging in user
     *
     * @param {String} email
     * @param {String} password
     * @returns {Promise<AxiosResponse<any>>}
     */
	loginUser: ({email, password}) => {

		return axiosInstanceWithoutAuth.post("/api/auth/local", {
			identifier: email,
			password: password
		})
	},

	/**
     * Removes JWT from localStorage, to logout a user.
     * This way it prevents authorization
     */
	logoutUser: () => {
		localStorage.removeItem("token")
	},

	/**
     * Uploads image file
     *
     * @param {File} image - The image file
     * @returns {Promise<AxiosResponse<any>>}
     */
	uploadImage: (image) => {
		const formData = new FormData()
		formData.append("files", image)
		return axiosInstanceWithAuth.post("/api/upload",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
	}
}

export default api