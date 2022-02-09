import React from "react"
import PropTypes from "prop-types"
import InputPair from "./InputPair"

function InfoForm({name, setName, photo, newPhoto, setNewPhoto, disabled, action, isCompany = false}) {
	return (
		<form
			onSubmit={action}
			className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-full max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			<span className="text-lg font-medium text-gray-900 block mb-2 dark:text-gray-100">
				{!isCompany ? "Basic" : "Company"} info
			</span>
			<div className="mb-5">
				<InputPair type="text" inputValue={name}
					setInputValue={e => setName(e.target.value)} labelText={!isCompany ? "User" : "Company" + " name"}/>
			</div>
			<div className="mb-5">
				<InputPair type="image" inputValue={name}
					setInputValue={e => setNewPhoto(e.target.files[0])} labelText={isCompany ? "Logo" : "Profile photo"}/>
			</div>
			<button type="submit"
				disabled={disabled}
				className="disabled:opacity-70 w-full text-white tracking-wide bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>Save
			</button>
			{
				newPhoto ? (
					<div className="mt-5">
						<p className="mb-3 text-sm text-gray-900 dark:text-gray-100">New {!isCompany ? "User" : "Company"} Photo preview:</p>
						<img className="rounded-lg w-40 h-40" src={URL.createObjectURL(newPhoto)} alt="new photo"/>
					</div>) : (
					<div className="mt-5">
						<p className="mb-3 text-sm text-gray-900 dark:text-gray-100">Your Current {!isCompany ? "User" : "Company"} Photo:</p>
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