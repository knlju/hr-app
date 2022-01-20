import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import api from "../../api"

export const MyProfile = () => {
	const {data} = useQuery("getMyProfile", api.getMyProfile)

	let id = null

	if (data && data.data && data.data.email) {
		// znaci da je response succes
		if (data.data.id) {
			id = data.data.id
		}
	}

	const putId = ()=> {
		api.editMyProfile(id)
	}

	


	const initialState = {
		email: "",
		username: ""
	}
	const [state, setstate] = useState(initialState)

	useEffect(() => {
		console.log("data se promenio za my profil")
		console.log(data)
		console.log("id", id)
		if (data && data.data && data.data.email) {
			// znaci da je response succes
			const preparedFormData = {}
			if (data.data.email) {
				preparedFormData.email = data.data.email
			}
			if (data.data.username) {
				preparedFormData.username = data.data.username
			} else {
				preparedFormData.username = "Neki USername"
			}
			setstate(preparedFormData)
		}
	}, [data])




	return (
		<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
				<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">basic info</span>
				<div>
					<label htmlFor="userName"
						className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                name *</label>
					<input type="text" name="name" id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder={"userName"} value={state.username} required="" onChange={()=>{}}/>
				</div>
				<div>
					<label htmlFor="formFile"
						className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Profile
                                photo</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						type="file" id="formFile" accept="image/*"/>
				</div>
				<button type="submit"
					className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					// onClick={handleSubmit}
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
