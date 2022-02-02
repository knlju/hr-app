import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import api from "../../api"
import { useSelector } from "react-redux"
import SpinnerLoader from "../shared/SpinnerLoader"
import { useGetMyProfile } from "../../hooks"

//TODO: dodati InfoForm i ovde
//TODO: ipak je reset password umesto new password ili tako nesto...
export const MyProfile = () => {

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)

	const [userName, setUserName] = useState("")
	const [userEmail, setUserEmail] = useState("")
	const [userProfilePhoto, setUserProfilePhoto] = useState(null)
	const [profileId, setProfileId] = useState(null)
	const [image, setImage] = useState(null)

	const {data, isLoading, isError, refetch} = useGetMyProfile(isLoggedIn, {
		onSuccess: data => {
			if(data && data.data && data.data.data[0] && data.data.data[0].id) {
				setProfileId(data.data.data[0].id)
				setImage(data.data.data[0].attributes.profilePhoto.data.attributes.formats.thumbnail.url)
				setUserEmail(data.data.data[0].attributes.user.data.attributes.email)
				setUserName(data.data.data[0].attributes.name)
			}
		}
	})


	useEffect(() => {
		refetch()
	}, [])


	const {
		mutate
	} = useMutation((payload)=>{ 
		api.editMyProfile(payload)
	})

	const handleSubmit = (e)=> {
		e.preventDefault()
		console.log("klik na submit")
		console.log(profileId)
		if (profileId) {
			const payload = {
				id: profileId,
				username: userName,
				imageToSend: userProfilePhoto
			}
			mutate(payload)
		}
	}

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}


	return (
		<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
				<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">basic info</span>
				<div>
					<label htmlFor="userName"
						className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                name *</label>
					<input type="text" name="username" id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder={"userName"} value={state.username} required="" onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor="formFile"
						className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Profile
                                photo</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						type="file" id="formFile" accept="image/*" onChange={(e) => setUserProfilePhoto(e.target.files[0])}/>
				</div>
				<button type="submit"
					className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={handleSubmit}
				>Save
				</button>
			</div>
			<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
				<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">security</span>
				<div>
					<span className="text-sm font-medium text-gray-300 block mb-2 dark:text-gray-300">email: {state.email}</span>
				</div>
				<div>
					<label htmlFor="password"
						className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Current
                                password *</label>
					<input type="password" name="password" id="password" placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						required="" />
				</div>
				<div>
					<label htmlFor="confirmPassword"
						className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">New
                                password *</label>
					<input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						required="" />
				</div>
				<button type="submit"
					className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
				</button>
			</div>
		</div>
	)
}
