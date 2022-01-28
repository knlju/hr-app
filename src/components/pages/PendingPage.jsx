import React, {useState} from "react"
import Loader from "../shared/Loader"
import {useNavigate} from "react-router"
import DeleteUserModal from "../shared/DeleteUserModal"
import {usePendingTeamMemberProfiles} from "../../hooks"
import UserCard from "../shared/UserCard"
import {useMutation, useQueryClient} from "react-query"
import api from "../../api"
import SpinnerLoader from "../shared/SpinnerLoader"

export const PendingPage = () => {
	const {data: teamMembers, isLoading, isError} = usePendingTeamMemberProfiles()
	const [userToDelete, setUserToDelete] = useState(false)
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const deleteUserProfile = useMutation((id) => api.deleteProfileById(id), {
		onSuccess: (e) => {
			console.log({e})
			queryClient.invalidateQueries("getPendingTeamMemberProfiles")
		}
	})

	function openEditPage(e, userId) {
		e.stopPropagation()
		navigate(`/team/${userId}/edit`)
	}

	function openDeleteModal(e, user) {
		e.stopPropagation()
		setUserToDelete(user)
	}

	function deleteUser() {
		deleteUserProfile.mutate(userToDelete.id)
		setUserToDelete(false)
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

	console.log({teamMembers})
	console.log("data.data.data:", teamMembers.data.data)

	return (
		<div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
			{userToDelete &&
                <DeleteUserModal onCancel={() => setUserToDelete(false)} onConfirm={deleteUser} user={userToDelete}
                />}
			{
				teamMembers.data.data.map(user => (
					<UserCard user={user} key={user.id} openDeleteModal={openDeleteModal} mainAction={openEditPage} actionName="Details" />
				))
			}
		</div>
	)
}
