import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import api from "../../api"
import { useSelector } from "react-redux"
import SpinnerLoader from "../shared/SpinnerLoader"
import { useAlert, useGetMyProfile, usePostImageMutation, useUserProfileQuery } from "../../hooks"
import Alert from "../shared/Alert"
import InfoForm from "../shared/InfoForm"
import Loader from "../shared/Loader"

//TODO: dodati InfoForm i ovde
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

	const {data, isLoading, isError, refetch} = useGetMyProfile(isLoggedIn, {
		onSuccess: data => {
			if(data && data.data && data.data.data[0] && data.data.data[0].id) {
				setProfileId(data.data.data[0].id)
				setImage(data.data.data[0].attributes.profilePhoto.data?.attributes.formats.thumbnail.url)
				setUserEmail(data.data.data[0]?.attributes.user.data.attributes.email)
				setUserName(data.data.data[0]?.attributes.name)
			}
		}
	})
	const [alert, setAlert] = useState({ show: false })
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false })
		}, 3000)
	}
	

	useEffect(() => {
		refetch()
	}, [])


	const {
		mutateAsync,
		isLoading: editLoading,
		isError: editError
	} = useMutation((payload)=>{ 
		api.editMyProfile(payload)
	})
	const {
		mutateAsync: password,
	} = useMutation((payload)=>{ 
		api.editPassword(payload)
	})


	const handleSubmit = async (e)=> {
		e.preventDefault()
		if (profileId) {
			const payload = {
				id: profileId,
				username: userName,
				imageToSend: userProfilePhoto
			}
			await mutateAsync(payload)
		}
		
		setTimeout(() => {
			handleAlert({ type: "success", text: "Profile successfully changed!" })
		}, 1000)
	}
	const handlePassword = async (e)=> {
		e.preventDefault()
		if (profileId) {
			const payload = {
				id: profileId,
				// code: "privateCode",
				password: newPassword,
				passwordConfirmation: newPassword
			}
			await password(payload)
		}
		setTimeout(() => {
			handleAlert({ type: "success", text: "Password successfully changed!" })
		}, 1000)
		
	}

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}


	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}
			{editLoading && <Loader />}
			{editError && <p>Update error... Try again</p>}
			<div className="flex justify-between items-start mx-auto max-w-screen-lg py-10">
				<InfoForm
					name={userName}
					setName={setUserName}
					action={handleSubmit}
					photo={image}
					newPhoto={userProfilePhoto}
					setNewPhoto={setUserProfilePhoto}
					disabled={editLoading}
				/>
				<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
					<span className="text-lg font-medium text-gray-900 block mb-2 dark:text-gray-300">Security</span>
					<div>
						<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email: {userEmail}</span>
					</div>
					<div className="mb-5">
						<label htmlFor="password"
							className="text-sm font-medium text-gray-900 block mb-0 dark:text-gray-300">Current
                                password</label>
						<input type="password" name="password" id="password" placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required="" value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}/>
					</div>
					<div className="mb-5">
						<label htmlFor="confirmPassword"
							className="text-sm font-medium text-gray-900 block mb-0 dark:text-gray-300">New
                                password</label>
						<input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							required="" value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}/>
					</div>
					<button type="submit"
						className=" text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={handlePassword}>Save
					</button>
				</div>
			</div>
		</>
	)
}
