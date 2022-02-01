import jwtDecode from "jwt-decode"
import {useQuery} from "react-query"
import api from "../api"

/**
 * useQuery hook for getting published team member profiles
 *
 * @param {Number} comapnyId
 * @returns {UseQueryResult<AxiosResponse<*>, unknown>}
 */
export const usePublishedTeamMemberProfiles = (comapnyId) => {
	return useQuery("getPublishedTeamMemberProfiles",
		() => api.getPublishedTeamMemberProfiles(comapnyId))
}

/**
 * useQuery hook for getting pending team member profiles
 *
 * @param {Number} comapnyId
 * @returns {UseQueryResult<unknown, unknown>}
 */
export const usePendingTeamMemberProfiles = (comapnyId) => {
	return useQuery("getPendingTeamMemberProfiles",
		() => api.getPendingTeamMemberProfiles(comapnyId))
}

/**
 * Returns useQuery hook for fetching user by ID
 *
 * @param {Number} profileId
 * @param {Object} options - extra useQuery options
 * @returns {UseQueryResult<AxiosResponse<*>, unknown>}
 */
export const useUserProfileQuery = (profileId, options = {}) => {
	return useQuery("getUserProfile",
		() => api.getProfileByProfileID(profileId), {
			...options,
			enabled: false
		})
}

/**
 * * Returns useQuery hook for fetching user by Token
 * 
 * @param {boolean} isLoggedIn 
 * @returns 
 */
export const useGetMyProfile = (isLoggedIn, options = {}) => {
	return useQuery("getMyProfile", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				const tokenDecoded = jwtDecode(token)
				const userId = tokenDecoded.id
				return api.getProfileByID(userId)
			}
			return false
		}
		return false
	}, options)
}
/**
 * * Returns useQuery hook for fetching questions by companyID
 * 
 * @param {boolean} isLoggedIn 
 * @returns 
 */
export const useGetCompanyQuestions = (isLoggedIn, companyID, options = {}) => {
	return useQuery("getMyProfile", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				return api.getQuestions(companyID)
			}
			return false
		}
		return false
	}, options)
}
