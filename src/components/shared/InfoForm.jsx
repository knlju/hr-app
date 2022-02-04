import React from "react"
import PropTypes from "prop-types"

function InfoForm({name, setName, photo, newPhoto, setNewPhoto, disabled, action, isCompany = false}) {
	return (
		<form
			onSubmit={action}
			className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			<span className="text-lg font-medium text-violet-800 block mb-2 dark:text-gray-300">
				{!isCompany ? "Basic" : "Company"} info
			</span>
			<div className="mb-5">
				<label htmlFor="userName"
					className="text-sm font-medium text-violet-800 block mb-0 dark:text-gray-300">
					{!isCompany ? "User" : "Company"} name
				</label>
				<input type="text" name="username" id="name"
					className="bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder={"userName"} value={name} required=""
					onChange={e => setName(e.target.value)}/>
			</div>
			<div className="mb-5">
				<label htmlFor="formFile"
					className="form-label text-sm font-medium text-violet-800 block mb-0 dark:text-gray-300">
					{isCompany ? "Logo" : "Profile photo"}
				</label>
				<input
					className="relative bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white file:bg-violet-800 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:absolute file:top-1.5 file:right-1"
					type="file" id="formFile" accept="image/*"
					onChange={(e) => setNewPhoto(e.target.files[0])}
				/>
			</div>
			<button type="submit"
				disabled={disabled}
				className="disabled:opacity-70 text-white bg-violet-800 hover:bg-violet-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Save
			</button>
			{
				newPhoto ? (
					<div className="mt-5">
						<p className="mb-3 text-sm text-violet-800">New {!isCompany ? "User" : "Company"} Photo preview:</p>
						<img className="rounded-lg w-40 h-40" src={URL.createObjectURL(newPhoto)} alt="new photo"/>
					</div>) : (
					<div className="mt-5">
						<p className="mb-3 text-sm text-violet-800">Your Current {!isCompany ? "User" : "Company"} Photo:</p>
						<img className="rounded-lg w-40 h-40" src={photo} alt={name}/>
					</div>
				)
			}
		</form>
	)
}

InfoForm.propTypes = {
	name: PropTypes.string,
	setName: PropTypes.func,
	photo: PropTypes.any,
	newPhoto: PropTypes.any,
	setNewPhoto: PropTypes.func,
	disabled: PropTypes.bool,
	action: PropTypes.func,
	isCompany: PropTypes.bool,
}

export default InfoForm