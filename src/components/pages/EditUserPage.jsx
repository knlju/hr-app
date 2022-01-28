import React, {useEffect, useState} from "react"
import {useParams} from "react-router"
import {useUserProfileQuery} from "../../hooks"
import SpinnerLoader from "../shared/SpinnerLoader"

function EditUserPage() {

	const {id: profileId} = useParams()

	const {data: user, isLoading, isError, refetch} = useUserProfileQuery(parseInt(profileId), {
		onSuccess: user => {
			setUsername(user.data.data.attributes.name)
		}
	})

	const [username, setUsername] = useState("Loading username..")

	useEffect(() => {
		refetch()
	}, [])

	if (isLoading) {
		return <SpinnerLoader/>
	}

	if (isError) {
		return <p>Loading error...</p>
	}

	console.log({user})

	return (
		<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
			<div
				className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
				<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">basic info</span>
				<div>
					<label htmlFor="userName"
						className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                        name *</label>
					<input type="text" name="username" id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder={"userName"} value={username} required="" onChange={e => setUsername(e.target.value)}/>
				</div>
				<div>
					<label htmlFor="formFile"
						className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Profile
                        photo</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						type="file" id="formFile" accept="image/*"
						// onChange={(e) => setUserProfilePhoto(e.target.files[0])}/>
					/>
				</div>
				<button type="submit"
					disabled={isLoading || isError}
					className="disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					// onClick={handleSubmit}
				>Save
				</button>
			</div>
		</div>
	)
}

export default EditUserPage