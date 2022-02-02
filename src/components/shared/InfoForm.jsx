import React from "react"
import PropTypes from "prop-types"

function InfoForm({name, setName, photo, newPhoto, setNewPhoto, disabled, action, isCompany = false}) {
	return (
		<form
			onSubmit={action}
			className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			<span className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
				{!isCompany ? "Basic" : "Company"} info
			</span>
			<div>
				<label htmlFor="userName"
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
					{!isCompany ? "User" : "Company"} name *
				</label>
				<input type="text" name="username" id="name"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder={"userName"} value={name} required=""
					onChange={e => setName(e.target.value)}/>
			</div>
			<div>
				<label htmlFor="formFile"
					className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
					{isCompany ? "Logo" : "Profile photo"}
				</label>
				<input
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					type="file" id="formFile" accept="image/*"
					onChange={(e) => setNewPhoto(e.target.files[0])}
				/>
			</div>
			<button type="submit"
				disabled={disabled}
				className="disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>Save
			</button>
			{
				newPhoto ? (
					<div>
						<p>New Profile Photo preview:</p>
						<img src={URL.createObjectURL(newPhoto)} alt="new photo"/>
					</div>) : (
					<div>
						<img src={photo} alt=""/>
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