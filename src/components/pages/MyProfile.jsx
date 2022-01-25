import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import api from "../../api"
import jwtDecode from "jwt-decode"
import { useSelector } from "react-redux"

export const MyProfile = () => {

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	// const {data} = useQuery("getMyProfile", ()=>api.getMyProfile(jwtDecode(localStorage.getItem("token")).id))

	// const userId = "327"
	// const userId = "479"
	// const {data} = useQuery("getMyProfile", ()=>api.getMyProfile(userId))
	const {data} = useQuery("getMyProfile", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				const tokenDecoded = jwtDecode(token)
				const userId = tokenDecoded.id
				// const userId = 327 // laziranje
				return api.getMyProfile(userId)
			}
			return false
		}
		return false
	})
	console.log("-------data za novog korisnika----------", data)


	const initialState = {
		email: "",
		username: ""
	}
	const [state, setState] = useState(initialState)
	const [userProfilePhoto, setUserProfilePhoto] = useState(null)


	const handleChange = (e)=> {
		const target = e.target
		const value = target.type === "checkbox" ? target.checked : target.value
		const name = target.name
		setState({
			[name]: value
		})
	}

	// const putId = ()=> {
	// 	api.editMyProfile(id)
	// }

	// console.log("proveravam datu za korisnika", data)

	let id = null
	// let id = "327"

	useEffect(() => {
		console.log("data se promenio za my profil")
		console.log(data)
		console.log("id", id)
		/*
		// STARI API ZA MY PROFILE
		if (data) {
			// znaci da je response succes
			const preparedFormData = {}
			if (data) {
				preparedFormData.email = data.data[0].attributes.user.data.attributes.email
				preparedFormData.username = data.data[0].attributes.user.data.attributes.username
			}
			// if (data.data) {
			// 	// preparedFormData.username = data.data.username
			// } 
			else {
				preparedFormData.username = "Neki USername"
			}
			setState(preparedFormData)
		}
		*/
		if (isLoggedIn) {
			if(data && data.data && data.data.data[0] && data.data.data[0].id) {
				// znaci da je response succes
				// znaci da su podaci stigli u validnoj formi
				id = data.data.data[0].id // sad upisujemo pravi id koji dobijemo iz data
				// id = 327 // laziranje
				const preparedFormData = {}
				console.log(data)
				preparedFormData.email = data.data.data[0].attributes.user.data.attributes.email
				preparedFormData.username = data.data.data[0].attributes.user.data.attributes.username
				setState(preparedFormData)
			}
		}
	}, [data])


	const {
		mutate
	} = useMutation((payload)=>{ 
		api.editMyProfile(payload)
	})

	const handleSubmit = ()=> {
		console.log("klik na submit")
		console.log(id)
		if (id) {
			const payload = {
				id: id,
				userProfileData: state,
				imageToSend: userProfilePhoto
			}
			mutate(payload)
		}
		// let laznjak = 1
		// if (laznjak === 1) { // laziramo da iammo id
		// 	const payload = {
		// 		id: 327, // lazirano
		// 		userProfileData: state,
		// 		imageToSend: userProfilePhoto
		// 	}
		// 	mutate(payload)
		// }
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
