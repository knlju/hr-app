import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {createCompanySuccess, fetchCompaniesStart, loginError, registerStart} from "../../redux/actions/actions"
import PropTypes from "prop-types"
import Loader from "../shared/Loader"
import InputPair from "../shared/InputPair"
import {COMPANIES_ANNEX, INPUT_TYPES, ROLE_SELECT} from "../../constants"
import {useToast} from "../../contexts/ToastProvider"


const CreateNewCompany = ({
	companyName,
	setCompanyName,
	companySlug,
	setCompanySlug,
	setErrorCompanyName,
	setErrorCompanySlug,
	validateCompanyName,
	validateCompanySlug,
	errorCompanyName,
	errorCompanySlug
}) => {

	return (
		<>
			<div className="font-medium text-gray-900 block mb-2 dark:text-gray-300">
                Create a new company
			</div>
			<div>
				<InputPair type={INPUT_TYPES.text} inputValue={companyName}
					setInputValue={e => setCompanyName(e.target.value)} labelText="Company
                    name" placeholder="Company name..." onFocus={() => setErrorCompanyName(false)}
					onBlur={validateCompanyName} error={errorCompanyName}/>
			</div>
			<div>
				<InputPair type={INPUT_TYPES.text} inputValue={companySlug}
					setInputValue={e => setCompanySlug(e.target.value)} labelText="Company slug"
					placeholder="Company slug..." onFocus={() => setErrorCompanySlug(false)}
					onBlur={validateCompanySlug} error={errorCompanySlug}/>
			</div>
		</>
	)
}

CreateNewCompany.propTypes = {
	companyName: PropTypes.string,
	companySlug: PropTypes.string,
	setCompanyName: PropTypes.func,
	setCompanySlug: PropTypes.func,
	setErrorCompanyName: PropTypes.func,
	setErrorCompanySlug: PropTypes.func,
	validateCompanyName: PropTypes.func,
	validateCompanySlug: PropTypes.func,
	errorCompanyName: PropTypes.any,
	errorCompanySlug: PropTypes.any,
}

const RegisterPage = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [companyId, setCompanyId] = useState("-1")
	const [userRole, setUserRole] = useState("company_user")
	const [image, setImage] = useState(null)
	const [companyName, setCompanyName] = useState("")
	const [companySlug, setCompanySlug] = useState("")

	const [errorEmail, setErrorEmail] = useState(false)
	const [errorPass, setErrorPass] = useState(false)
	const [errorUsername, setErrorUsername] = useState(false)
	const [errorCompany, setErrorCompany] = useState(false)
	const [errorCompanyName, setErrorCompanyName] = useState(false)
	const [errorCompanySlug, setErrorCompanySlug] = useState(false)

	const companies = useSelector(state => state.companies)
	const user = useSelector(state => state.user)
	const addToast = useToast()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCompaniesStart())
	}, [])

	const submitRegistration = (e) => {
		e.preventDefault()
		if (validate()) {
			let company = companyId
			const payload = {username, email, password, company, userRole}
			if (parseInt(companyId) < 1) {
				company = {name: companyName, slug: companySlug}
				payload.company = company
			}
			if (image) {
				payload.image = image
			}
			dispatch(registerStart(payload))
		}

	}

	function handleCompanyChange(e) {
		setCompanyId(e.target.value)
		dispatch(createCompanySuccess({
			data: {
				data: companies.companies.find(company => company.id === parseInt(e.target.value))
			}
		}))
	}

	const validateEmail = () => {
		if (!email || email === "") {
			setErrorEmail("Email can't be empty!")
			return false
		}
		// else if (emailRegEx.test(email)){
		// 	setErrorEmail("Not valid email!")
		// 	return false
		// }
		else {
			setErrorEmail(false)
			return true
		}
	}
	const validatePassword = () => {
		if (!password || password === "") {
			setErrorPass("Password can't be empty!")
			return false
		}
		// else if (regexPassword){}
		else {
			setErrorPass(false)
			return true
		}
	}
	const validateUsername = () => {
		if (!username || username === "") {
			setErrorUsername("Username can't be empty!")
			return false
		} else {
			setErrorUsername(false)
			return true
		}
	}

	const validateCompanyName = () => {
		if (!companyName || companyName === "") {
			setErrorCompanyName("Company Name can't be empty!")
			return false
		} else {
			setErrorCompanyName(false)
			return true
		}
	}
	const validateCompanySlug = () => {
		if (!companySlug || companySlug === "") {
			setErrorCompanySlug("Company Slug can't be empty!")
			return false
		} else {
			setErrorCompanySlug(false)
			return true
		}
	}
	const validateCompany = () => {
		if (companyId === "-1") {
			setErrorCompany("Please, choose your company!")
			return false
		} else if (companyId === "0") {
			validateCompanyName()
			validateCompanySlug()
		} else {
			setErrorCompany(false)
			return true
		}
	}

	const validate = () => {
		const emailValid = validateEmail()
		const passwordValid = validatePassword()
		const usernameValid = validateUsername()
		const companyValid = validateCompany()

		return emailValid && passwordValid && usernameValid && companyValid
	}

	if (user.error) {
		addToast({type: "danger", text: user.error.message})
		dispatch(loginError(null))
	}

	return (
		<>
			{user.isLoading && <Loader/>}
			<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
				<div
					className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-full lg:w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" action="#" onSubmit={submitRegistration}>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
						<div>
							<InputPair type={INPUT_TYPES.text} inputValue={username}
								setInputValue={e => setUsername(e.target.value)} labelText="Your name" placeholder="Your name..." onFocus={()=>setErrorUsername(false)} onBlur={validateUsername} error={errorUsername}/>
								
						</div>
						<div>
							<InputPair type={INPUT_TYPES.email} inputValue={email}
								setInputValue={e => setEmail(e.target.value)} labelText="Your email" onFocus={()=>setErrorEmail(false)} onBlur={validateEmail} error={errorEmail}/>
						</div>
						<div>
							<InputPair type={INPUT_TYPES.password} inputValue={password}
								setInputValue={e => setPassword(e.target.value)} labelText="Your password" onFocus={()=>setErrorPass(false)} onBlur={validatePassword} error={errorPass}/>
								
						</div>
						<div>
							<InputPair type={INPUT_TYPES.image}
								setInputValue={e => setImage(e.target.files[0])} labelText="Profile photo"/>
							{image && (
								<div className="mt-5">
									<p className="mb-3 text-sm text-gray-900 dark:text-gray-100">Photo preview:</p>
									<img className="rounded-md w-40 h-40 object-cover" src={URL.createObjectURL(image)} alt="new photo"/>
								</div>
							)}
						</div>
						<div>
							<InputPair type={INPUT_TYPES.select} inputValue={userRole}
								setInputValue={e => setUserRole(e.target.value)}
								labelText="Role" selectOptions={ROLE_SELECT}/>
						</div>
						<div>
							<InputPair type={INPUT_TYPES.select} inputValue={companyId}
								setInputValue={handleCompanyChange}
								labelText="Company" selectOptions={COMPANIES_ANNEX.concat(companies?.companies)} onFocus={()=>setErrorCompany(false)} onBlur={validateCompany} error={errorCompany}/>
						</div>
						{(companyId === "0") && (
							<CreateNewCompany
								companyName={companyName}
								companySlug={companySlug}
								setCompanyName={setCompanyName}
								setCompanySlug={setCompanySlug}
								setErrorCompanyName={setErrorCompanyName}
								setErrorCompanySlug={setErrorCompanySlug}
								validateCompanyName={validateCompanyName}
								validateCompanySlug={validateCompanySlug}
								errorCompanyName={errorCompanyName}
								errorCompanySlug={errorCompanySlug}
							/>
						)}
						<div className="flex justify-between items-center">
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
								<Link to="/login" className="text-orange-600 hover:underline">Allready
                                    have an account?</Link>
							</div>
							<button type="submit"
								className=" text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center shadow-md tracking-wide">Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default RegisterPage