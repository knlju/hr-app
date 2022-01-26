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
     * @param {Number} profilePhoto - profile photo ID
     * @returns {Promise<AxiosResponse<any>>}
     */
	createProfile: ({name, company, user, userRole, profilePhoto = undefined}) => {
		return axiosInstanceWithAuth.post("/api/profiles", {
			data: {
				name,
				company,
				user,
				userRole,
				profilePhoto
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
	getOurCompany: (companyID) => {
		return axiosInstanceWithAuth.get("/api/companies/" + companyID + "?populate=*")
	},
	/**
     * Edit our company
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	editOurCompany: async (payload) => {
		console.log(payload)
		const {
			id,
			name,
			imageToSend,
		} = payload
		const res = await api.uploadImage(imageToSend)
		console.log("response od uploadImage")
		console.log(res)
		const submitData = {
			name,
			logo: res.data[0].id
		}
		return axiosInstanceWithAuth.put("/api/companies/" + id, {
			data: {
				...submitData
			}
		})
	},
	/**
     * GETs myProfile
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getProfileByID: (userId) => {
		// return axiosInstanceWithAuth.get("/api/profiles/me")
		return axiosInstanceWithAuth.get(`/api/profiles?filters[user][id][$eq]=${userId}&populate=*`)
		// get('/profiles?filters[user][id][$eq]=' + userStorage.user.id)
	},
	/**
     * Edit myProfile
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	editMyProfile: async (payload) => {
		const {
			id,
			userProfileData,
			imageToSend
		} = payload
		const res = await api.uploadImage(imageToSend)
		console.log("response od uploadImage")
		console.log(res)
		const submitData = {
			...userProfileData,
			profilePhoto: res.data[0].id
		}
		console.log("editMyProfile id", id, submitData)
		//return await axiosInstanceWithAuth.put("/api/users/" + id, submitData) // example id 17
		return await axiosInstanceWithAuth.put("/api/profiles/" + id, {
			data: {
				// profilePhoto: image.data,id
				...submitData

			},
		}) // example id 17
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
     * GETs user logged in with JWT token
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getCurrentUser: () => {
		return axiosInstanceWithAuth.get("/api/users/me")
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
	},

	// TODO: dodati paginaciju
	/**
     * Gets all pending populated profiles
     *
     * @returns {Promise<AxiosResponse<any>>}
     */
	getPublishedTeamMemberProfiles: () => {
		return axiosInstanceWithAuth.get("/api/profiles?filters[status][$eq]=published&sort=createdAt&populate=*")
	},

	// TODO: i ovde dodati paginaciju
	/**
     * Gets all published populated profiles by company ID
     * default company ID is the ID of our company 7
     *
     * @param {Number} companyId - Company ID, default 7
     * @returns {Promise<AxiosResponse<any>>}
     */
	getPendingTeamMemberProfiles: (companyId = 7) => {
		return axiosInstanceWithAuth.get(`/api/profiles?filters[status][$eq]=pending&filters[company][id][$eq]=${companyId}&sort=createdAt&populate=*`)
	},

	// TODO: i ovde dodati paginaciju
	/**
     * Gets all published populated profiles by company ID
     * default company ID is the ID of our company 7
     *
     * @param {Number} companyId - Company ID, default 7
     * @returns {Promise<AxiosResponse<any>>}
     */
	getAllPendingProfiles: () => {
		return axiosInstanceWithAuth.get(`/api/profiles?filters[status][$eq]=pending&sort=createdAt&populate=*`)
	},
}

export default api