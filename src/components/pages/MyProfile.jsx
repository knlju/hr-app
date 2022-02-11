import React, {useEffect, useState} from "react"
import {useMutation} from "react-query"
import api from "../../api"
import {useSelector} from "react-redux"
import SpinnerLoader from "../shared/SpinnerLoader"
import {useGetMyProfile} from "../../hooks"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"
import InputPair from "../shared/InputPair"
import {INPUT_TYPES} from "../../constants"
import {useToast} from "../../contexts/ToastProvider"

//TODO: ipak je reset password umesto new password ili tako nesto...
export const MyProfile = () => {

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)

	const [userName, setUserName] = useState("")
	const [userEmail, setUserEmail] = useState("")
	const [userProfilePhoto, setUserProfilePhoto] = useState(null)
	const [profileId, setProfileId] = useState(null)
	const [image, setImage] = useState(null)

	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const addToast = useToast()

	const {isLoading, isError, refetch} = useGetMyProfile(isLoggedIn, {
		onSuccess: data => {
			setProfileId(data?.data?.data?.[0].id)
			setImage(data?.data?.data?.[0].attributes.profilePhoto.data?.attributes.formats.thumbnail.url)
			setUserEmail(data?.data?.data?.[0]?.attributes.user.data.attributes.email)
			setUserName(data?.data?.data?.[0]?.attributes.name)
		}
	})
	const {
		mutate,
		isLoading: editLoading,
		isError: editError
	} = useMutation((payload) => {
		api.editMyProfile(payload)
	}, {
		onSuccess: () => addToast({type: "success", text: "Profile successfully changed!"}),
		onError: () => addToast({type: "danger", text: "Failed to update profile!"})
	})

	const {
		mutate: password,
	} = useMutation((payload) => {
		api.editPassword(payload)
	}, {
		onSuccess: () => addToast({type: "success", text: "Password successfully changed!"}),
		onError: () => addToast({type: "danger", text: "Failed to change password!"})
	})

	useEffect(() => {
		refetch()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (profileId) {
			const payload = {
				id: profileId,
				username: userName,
				imageToSend: userProfilePhoto
			}
			mutate(payload)
		}
	}

	const handlePassword = (e) => {
		e.preventDefault()
		if (profileId) {
			const payload = {
				id: profileId,
				// code: "privateCode",
				password: newPassword,
				passwordConfirmation: newPassword
			}
			password(payload)
		}
	}

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}

	return (
		<>
			{editLoading && <Loader/>}
			{editError && <p>Update error... Try again</p>}
			<div
				className="flex flex-col lg:flex-row lg:justify-between lg:items-start mx-auto max-w-screen-lg py-10 gap-4">
				<InfoForm
					name={userName}
					setName={setUserName}
					action={handleSubmit}
					photo={image}
					newPhoto={userProfilePhoto}
					setNewPhoto={setUserProfilePhoto}
					disabled={editLoading}
				/>
				<div
					className="bg-white shadow-md border border-gray-200 rounded-lg w-full max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-700">
					<span className="text-lg font-medium text-gray-900 block mb-2 dark:text-gray-100">Security</span>
					<div>
						<span
							className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-100">Your email: {userEmail}</span>
					</div>
					<div>
						<InputPair type={INPUT_TYPES.password} inputValue={oldPassword}
							setInputValue={e => setOldPassword(e.target.value)} labelText="Current password"/>
					</div>
					<div>
						<InputPair type={INPUT_TYPES.password} inputValue={newPassword}
							setInputValue={e => setNewPassword(e.target.value)} labelText="New password"/>
					</div>
					<button type="submit"
						className=" text-white w-full bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center tracking-wide"
						onClick={handlePassword}>Save
					</button>
				</div>
			</div>
		</>
	)
}
