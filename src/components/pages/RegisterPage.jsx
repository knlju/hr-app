import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchCompaniesStart, registerStart} from "../../redux/actions/actions"
import PropTypes from "prop-types"
import Loader from "../shared/Loader"

const CreateNewCompany = ({companyName, setCompanyName, companySlug, setCompanySlug}) => {
	return (
		<>
			<div className="font-medium text-gray-900 block mb-2 dark:text-gray-300">
                Create a new company
			</div>
			<div>
				<label htmlFor="companyName"
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company
                    name</label>
				<input type="text" name="companyName" id="name"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="name@company.com" required="" value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}/>
			</div>
			<div>
				<label htmlFor="companySlug"
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company slug</label>
				<input type="text" name="companySlug" id="companySlug"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="name@company.com" required="" value={companySlug}
					onChange={(e) => setCompanySlug(e.target.value)}/>
			</div>
		</>
	)
}

CreateNewCompany.propTypes = {
	companyName: PropTypes.string,
	companySlug: PropTypes.string,
	setCompanyName: PropTypes.func,
	setCompanySlug: PropTypes.func,
}





const FormField = (props) => {
	// pocetak komponente
	const name = props.name
	const value = props.formState[name]
	const errorValue = props.formErrors[name]

	let jsxError = null
	if (errorValue && errorValue !== "") {
		jsxError = (
			<div className="input-validation-error-msg">* {errorValue}</div>
		)
	}

	let jsx = (
		<div>
			<label htmlFor={name}
				className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">{props.title}</label>
			{jsxError}
			<input type="text" name={name}
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
				placeholder="name@company.com" required="" value={value}
				onChange={props.handleChange}/>
		</div>
	) 

	if (props.type === "email") {
		jsx = (
			<div>
				<label htmlFor={name}
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">{props.title}</label>
				{jsxError}
				<input type="email" name={name}
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder={props.placeholder} required="" value={value}
					onChange={props.handleChange}/>
			</div>
		)
	} else if (props.type === "password") {
		jsx = (
			<div>
				<label htmlFor={name}
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">{props.title}</label>
				{jsxError}
				<input type="password" name={name}
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					required="" value={value}
					onChange={props.handleChange}/>
			</div>
		)
	} 

	return (
		<>
			{jsx}
		</>
	)
}
FormField.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	formState: PropTypes.object,
	formErrors: PropTypes.object,
	handleChange: PropTypes.func,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
}




const RegisterPage = () => {
	const [username, setUsername] = useState("")

	const [formState, setFormState] = useState({})
	const [formErrors, setFormErrors] = useState({})

	const [name, setName] = useState("")
	// const name = formState.name
	const [email, setEmail] = useState("")
	// const email = formState.email
	// const {
	// 	name,
	// 	email,
	// 	password
	// } = formState
	const [password, setPassword] = useState("")
	const [companyId, setCompanyId] = useState("-1")
	const [userRole, setUserRole] = useState("company_user")
	const [image, setImage] = useState("cicada")
	const [companyName, setCompanyName] = useState("")
	const [companySlug, setCompanySlug] = useState("")

	// const proveraGreske = useSelector(defaultState => defaultState.user.error)


	const universalhandleChange = (e)=>{
		// svako input pooje zove ovoga na event onChange
		const name = e.target.name
		const value = e.target.value
		setFormState({
			...formState,
			[name]: value
		})
	}

	const validator = (formState)=>{
		let test = true
		let formErrorsMessages = {}

		if (!formState.name || formState.name === "") {
			test = false
			formErrorsMessages.name = "Korisnicko ime ne sme biti prazno"
		}
		
		if (!formState.email || formState.email === "") {
			test = false
			formErrorsMessages.email = "eMail mora biti unet"
		}

		setFormErrors(formErrorsMessages)
		return test
	}



	// const isLoggedIn = useSelector(state => state.user.isLoggedIn)
	const companies = useSelector(state => state.companies)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCompaniesStart())
	}, [])

	const submitRegistration = (e) => {
		e.preventDefault()

		// let company
		// TODO: odradi validaciju za kompaniju
		let company = companyId
		const payload = {username, email, password, company, userRole}
		if (parseInt(companyId) < 1) {
			company = {name: companyName, slug: companySlug}
			payload.company = company
		}
		if (image) {
			payload.image = image}
		dispatch(registerStart(payload))
		// if (validator(formState)) {
		// 	// submitujem osamo ako prodje validaciju
		// 	let company
		// 	const payload = {name, email, password}
		// 	if(parseInt(companyId) < 1) {
		// 		company = {name: companyName, slug: companySlug}
		// 		payload.company = company
		// 	}
		// 	if (image) {
		// 		payload.image = image
		// 	}
		// 	dispatch(registerStart(payload))
		// }
	}

	function handleCompanyChange(e) {
		setCompanyId(e.target.value)
	}



	function handleUserRoleChange(e) {
		setUserRole(e.target.value)
	}

	function handleImageChange(e) {
		console.log(e)
		setImage(e.target.files[0])
	}


	// if (isLoggedIn) {
	// 	return <Navigate to="/"/>
	// }

	// TODO: Add file preview
	return (
		<>
			{user.isLoading && <Loader/>}
			{user.error && <h1 className="text-6xl">{JSON.stringify(user.error)}</h1>}
			<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
				<div
					className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" action="#" onSubmit={submitRegistration}>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
						{/* <FormField 
							name="name"
							title="Your name"
							formState={formState}
							handleChange={universalhandleChange}
							formErrors={formErrors}
							placeholder="name@company.com"
						/>
						<FormField 
							name="email"
							title="Your email"
							formState={formState}
							handleChange={universalhandleChange}
							formErrors={formErrors}
							type="email"
							placeholder="name@company.com"
						/> */}


						<div>
							<label htmlFor="name"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                name *</label>
							<input type="text" name="name" id="name"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="username" required="" value={username}
								onChange={(e) => setUsername(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="email"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                email *</label>
							<input type="email" name="email" id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="name@company.com" required="" value={email}
								onChange={(e) => setEmail(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="password"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                password *</label>
							<input type="password" name="password" id="password" placeholder="••••••••"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="formFile"
								className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Profile
                                photo</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								type="file" id="formFile" accept="image/*" onChange={handleImageChange}/>
						</div>
						<div>
							<label htmlFor="formRole"
								className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Role *</label>
							{/* TODO: maybe use radiobutton instead of select here */}
							<select
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								value={userRole} onChange={handleUserRoleChange} id="formRole">
								<option value="company_user">User</option>
								<option value="company_admin">Admin</option>
							</select>
						</div>
						<div>
							<label htmlFor="formCompanies"
								className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Company</label>
							<select
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								value={companyId} onChange={handleCompanyChange} id="formCompanies">
								<option value="-1">Select a company</option>
								<option value="0">Create a new company</option>
								{companies && companies.companies.map(company => (
									<option key={company.id} value={company.id}>{company.attributes.name}</option>
								))}
							</select>
						</div>
						{(companyId === "0") && (
							<CreateNewCompany
								companyName={companyName}
								companySlug={companySlug}
								setCompanyName={setCompanyName}
								setCompanySlug={setCompanySlug}
							/>
						)}
						<div className="flex justify-between items-center">
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
								<Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Allready
                                    have an account?</Link>
							</div>
							<button type="submit"
								className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default RegisterPage