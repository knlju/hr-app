import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import {useEditProfileMutation, usePostImageMutation, useUserProfileQuery} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"
import QuestionsAndAnswers from "../shared/QuestionsAndAnswers"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"
import {useQueryClient} from "react-query"

function EditUserPage() {

	const {id: profileId} = useParams()

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

	const [username, setUsername] = useState("Loading username..")
	const [userProfilePhoto, setUserProfilePhoto] = useState(false)

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

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}

	console.log({user})

	return (
		<>
			{(isImageUploading || isProfileUpdateLoading) && <Loader />}
			{(imageUploadError || isProfileUpdateError) && <p>Update error... Try again</p>}
			<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
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
		</>
	)
}

export default EditUserPage