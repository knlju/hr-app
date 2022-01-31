import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router"
import {
	useDeleteUserAnswerMutation,
	useDeleteUserProfileMutation,
	useEditProfileMutation,
	usePostImageMutation,
	usePublishTeamMemberMutation,
	useUserProfileQuery
} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import QuestionsAndAnswers from "../shared/QuestionsAndAnswers"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"
import DeleteUserModal from "../shared/DeleteUserModal"

function EditUserPage() {

	const {id: profileId} = useParams()
	const navigate = useNavigate()

	const {data: user, isLoading, isError, refetch} = useUserProfileQuery(parseInt(profileId), {
		onSuccess: user => {
			setUsername(user.data.data.attributes.name)
		},
		enabled: false
	})

	const {
		mutateAsync: uploadImageAsyncMutation,
		isLoading: isImageUploading,
		isError: imageUploadError
	} = usePostImageMutation()

	const {
		mutateAsync: updateProfileAsyncMutation,
		isLoading: isProfileUpdateLoading,
		isError: isProfileUpdateError
	} = useEditProfileMutation()

	const {
		mutateAsync: publishProfileAsyncMutation,
		isLoading: isProfilePublishLoading,
		isError: isProfilePublishError
	} = usePublishTeamMemberMutation()

	const [username, setUsername] = useState("Loading username..")
	const [userProfilePhoto, setUserProfilePhoto] = useState(false)
	const [userToDelete, setUserToDelete] = useState(false)

	const {mutateAsync: mutateDeleteUserAsync, isLoading: isDeleteUserLoading} = useDeleteUserProfileMutation()
	const {mutateAsync: mutateDeleteAnswerAsync, isLoading: isDeleteAnswerLoading} = useDeleteUserAnswerMutation()

	useEffect(() => {
		refetch()
	}, [])

	async function onSave(e) {
		e.preventDefault()
		const profileUpdateOptions = {
			name: username
		}
		if (userProfilePhoto) {
			const uploadedImageResponse = await uploadImageAsyncMutation(userProfilePhoto)
			profileUpdateOptions.profilePhoto = uploadedImageResponse?.data[0].id
		}
		await updateProfileAsyncMutation({profileId: parseInt(profileId), putOptions: profileUpdateOptions})
		setUserProfilePhoto(false)
		refetch()
	}

	function navigateAfterAction() {
		if (user.data.data.attributes.status === "pending") {
			navigate("/team/pending")
		} else {
			navigate("/team")
		}
	}

	async function approveTeamMember() {
		await publishProfileAsyncMutation(parseInt(profileId))
		navigateAfterAction()
	}

	function openDeleteModal(e) {
		e.stopPropagation()
		setUserToDelete(user)
	}

	async function deleteUser() {
		await mutateDeleteUserAsync(userToDelete.data.data.id)
		await userToDelete.attributes?.answers?.data.forEach(async answer => {
			await mutateDeleteAnswerAsync(answer.id)
		})
		setUserToDelete(false)
		navigateAfterAction()
	}

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}

	console.log({user})

	return (
		<div>
			{(isImageUploading || isProfileUpdateLoading || isProfilePublishLoading) && <Loader/>}
			{(imageUploadError || isProfileUpdateError) && <p>Update error... Try again</p>}
			{isProfilePublishError && <p>Publish error :(</p>}
			{userToDelete && <DeleteUserModal onCancel={() => setUserToDelete(false)}
				user={user.data.data}
				disabled={isDeleteUserLoading || isDeleteAnswerLoading}
				onConfirm={deleteUser}/>}
			<div
				className="flex justify-between align-center mx-auto max-w-screen-lg py-10
				bg-white shadow-md border border-gray-200 rounded-lg mx-auto p-4 sm:p-6 lg:p-8
				dark:bg-gray-800 dark:border-gray-700 text-white"
			>
				<div>
                    Moderate team member entry
				</div>
				<div className="flex justify-end align-top gap-2">
					<button
						className="disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={approveTeamMember}>Approve
					</button>
					<button
						className="disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={openDeleteModal}>Delete
					</button>
				</div>
			</div>
			<div
				className="flex justify-between align-top mx-auto max-w-screen-lg py-10"
			>
				<InfoForm
					setName={setUsername}
					name={username}
					setNewPhoto={setUserProfilePhoto}
					newPhoto={userProfilePhoto}
					disabled={isError || isLoading}
					photo={user?.data?.data?.attributes?.profilePhoto?.data?.attributes.url}
					action={onSave}/>
				<QuestionsAndAnswers companyId={user?.company?.id} profileId={parseInt(profileId)}/>
			</div>
		</div>
	)
}

export default EditUserPage