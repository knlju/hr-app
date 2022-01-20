import React, { useState, useEffect } from "react"
import { useQuery } from "react-query"
import api from "../../api"

export const Company = () => {
	
	// data.data.data.attributes.name
	const {data} = useQuery("getOurCompany", api.getOurCompany)
	const [companyName, setCompanyName] = useState("")
	const [companyLogo, setCompanyLogo] = useState(null)
	
	// useEffect(() => {

	// 	setCompanyName(data.data.data.attributes.name)
	// }, [])
	// useEffect(() => {
		
	// 	data.then((data) => {
	// 		setCompanyName(data.data.data.attributes.name)
	// 	})
	// 		.catch((err) => {
	// 		})
	// }, [])
	useEffect(() => {
		if (data) {
			setCompanyName(data.data.data.attributes.name)
			console.log(data.data.data)
		}
	}, [data])

	const handleCompanyInfo = (e) => {
		e.preventDefault();

		(async()=>{
			const image = await api.uploadImage(companyLogo)
			const companyUpdated = await api.editOurCompany({name: companyName, logo: image.data.id})
			console.log(companyUpdated)
		})()
		
	}
	return (
		<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
				<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company info</span>
				<form> 
					<div>
						<label htmlFor="companyName"
							className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company
                                name *</label>
						<input type="text" name="companyName" id="companyName"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder={companyName} required="" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="formFile"
							className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company
                                logo</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white 
						relative
						file:bg-blue-500
						file:rounded-md file:text-white file:px-4 file:py-1
						file:absolute file:right-1 file:top-1"
							type="file" id="formFile" accept="image/*" onChange={(e) => setCompanyLogo(e.target.files[0])}/>
					</div>
					<button type="submit"
						className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCompanyInfo}>Save
					</button>
				</form>
			</div>
		</div>
	)
}
