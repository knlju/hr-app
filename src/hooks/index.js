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
