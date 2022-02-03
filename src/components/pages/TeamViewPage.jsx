import React from "react"
import {useSelector} from "react-redux"
import {usePublishedTeamMemberProfiles} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import UserCard from "../shared/UserCard"

export const TeamViewPage = () => {
	const company = useSelector(state => state.companies.userCompany.data)
	const {data: teamMembers, isLoading, isError} = usePublishedTeamMemberProfiles(company.id)

	if (isLoading) {
		return (
			<SpinnerLoader/>
		)
	}

	if (isError) {
		return (
			<p>
                Loading error...
			</p>
		)
	}

	return (
		<>
			<div className="flex justify-between py-5">
				<h1>{company?.attributes.name}</h1>
			</div>
			<div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
				{
					teamMembers?.data?.data?.map(user => (
						<UserCard user={user} key={user.id} noActions />
					))
				}
			</div>
		</>
	)
}
