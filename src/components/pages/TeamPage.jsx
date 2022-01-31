import React, {useEffect, useState} from "react"
import {useQuery} from "react-query"
import api from "../../api"
import Loader from "../shared/Loader"
import {useNavigate} from "react-router"
import {useSelector} from "react-redux"
import {
	useDeleteUserAnswerMutation,
	useDeleteUserProfileMutation,
	usePendingTeamMemberProfiles,
	usePublishedTeamMemberProfiles
} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import DeleteUserModal from "../shared/DeleteUserModal"
import UserCard from "../shared/UserCard"
import InviteModal from "../InviteModal"

export const TeamPage = () => {
	const companyId = useSelector(state => state.companies.userCompany.data.id)
	const companySlug = useSelector(state => state.companies.userCompany.data.attributes.slug)
	const {data: teamMembers, isLoading, isError, refetch} = usePublishedTeamMemberProfiles(companyId)
	const [userToDelete, setUserToDelete] = useState(false)
	const [inviteModalOpen, setInviteModalOpen] = useState(false)
	const navigate = useNavigate()

	const {mutateAsync: mutateDeleteUserAsync, isLoading: isDeleteUserLoading} = useDeleteUserProfileMutation()
	const {mutateAsync: mutateDeleteAnswerAsync, isLoading: isDeleteAnswerLoading} = useDeleteUserAnswerMutation()

	function openEditPage(e, userId) {
		e.stopPropagation()
		navigate(`/team/${userId}/edit`)
	}

	function openDeleteModal(e, user) {
		e.stopPropagation()
		setUserToDelete(user)
	}

	function addNewTeamMember(e) {
		setInviteModalOpen(true)
	}

	async function deleteUser() {
		await mutateDeleteUserAsync(userToDelete.id)
		await userToDelete.attributes?.answers?.data.forEach(async answer => {
			return await mutateDeleteAnswerAsync(answer.id)
		})
		setUserToDelete(false)
		refetch()
	}

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
			{userToDelete &&
				<DeleteUserModal disabled={isDeleteUserLoading || isDeleteAnswerLoading} onCancel={() => setUserToDelete(false)} onConfirm={deleteUser} user={userToDelete}/>}
			{(isDeleteUserLoading || isDeleteAnswerLoading) && <Loader/>}
			{inviteModalOpen && <InviteModal companySlug={companySlug} closeModal={() => setInviteModalOpen(false)} />}
			<div className="flex justify-between py-5">
				<h1>Team</h1>
				<div>
					<button onClick={addNewTeamMember}>+ Add New Team Member</button>
				</div>
			</div>
			<div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
				{
					teamMembers?.data?.data?.map(user => (
						<UserCard user={user} key={user.id} openDeleteModal={openDeleteModal} mainAction={openEditPage}
							actionName="Edit"/>
					))
				}
			</div>
		</>
	)
}
