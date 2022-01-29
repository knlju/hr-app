import {useQuery} from "react-query"
import api from "../api"

/**
 * useQuery hook for getting published team member profiles
 *
 * @param {Number} company
 * @returns {UseQueryResult<AxiosResponse<*>, unknown>}
 */
export const usePublishedTeamMemberProfiles = (company) => {
	return useQuery(["getPublishedTeamMemberProfiles", company],
		() => api.getPublishedTeamMemberProfiles(company))
}

/**
 * useQuery hook for getting pending team member profiles
 *
 * @param {Number} company
 * @returns {UseQueryResult<unknown, unknown>}
 */
export const usePendingTeamMemberProfiles = (company) => {
	return useQuery(["getPendingTeamMemberProfiles", company],
		() => api.getPendingTeamMemberProfiles(company))
}

/**
 * Returns useQuery hook for fetching user by ID
 *
 * @param {Number} profileId
 * @param {Object} options - extra useQuery options
 * @returns {UseQueryResult<AxiosResponse<*>, unknown>}
 */
export const useUserProfileQuery = (profileId, options = {}) => {
	return useQuery(["getUserProfile", profileId],
		() => api.getProfileByProfileID(profileId), {
			...options,
			enabled: false,
			// initialData: () => {
			// 	console.log(queryClient.getQueryData())
			// 	alert("ziv sam")
			// }
			// ?.data.find(profile => console.log({profile}))
		})
}
