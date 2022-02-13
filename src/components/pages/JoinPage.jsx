import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchCompaniesStart, registerError, registerStart} from "../../redux/actions/actions"
import Loader from "../shared/Loader"
import {Link} from "react-router-dom"
import {useParams} from "react-router"
import InputPair from "../shared/InputPair"
import {INPUT_TYPES} from "../../constants"
import {useToast} from "../../contexts/ToastProvider"

const JoinPage = () => {

	const {slug} = useParams()

	const companies = useSelector(state => state.companies)
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [company,] = useState(companies.companies?.filter(company => company.attributes.slug === slug)?.[0])
	const [userRole,] = useState("company_user")

	const [errorEmail, setErrorEmail] = useState(false)
	const [errorPass, setErrorPass] = useState(false)
	const [errorUsername, setErrorUsername] = useState(false)
	const addToast = useToast()

	const [image, setImage] = useState()

	useEffect(() => {
		dispatch(fetchCompaniesStart())
	}, [])

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
		}
		else {
			setErrorUsername(false)
			return true
		}
	}

	const validate = () => {
		const emailValid = validateEmail()
		const passwordValid = validatePassword()
		const usernameValid = validateUsername()

		return emailValid && passwordValid && usernameValid
	}

	const submitRegistration = (e) => {
		e.preventDefault()
		if(!validate()) return
		let company = companies.companies?.filter(company => company.attributes.slug === slug)?.[0]?.id
		const payload = {username, email, password, company, userRole}
		if (image) {
			payload.image = image
		}
		dispatch(registerStart(payload))
	}

	if (user.error) {
		addToast({type: "danger", text: user.error.message})
		dispatch(registerError(null))
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
							<InputPair
								type={INPUT_TYPES.text} inputValue={username}
								setInputValue={e => setUsername(e.target.value)} labelText="Your name"
								placeholder="Your name..." onFocus={() => setErrorUsername(false)}
								onBlur={validateUsername} error={errorUsername}/>
						</div>
						<div>
							<InputPair
								type={INPUT_TYPES.email} inputValue={email}
								setInputValue={e => setEmail(e.target.value)} labelText="Your email"
								onFocus={() => setErrorEmail(false)} onBlur={validateEmail} error={errorEmail}/>
						</div>
						<div>
							<InputPair
								type={INPUT_TYPES.password} inputValue={password}
								setInputValue={e => setPassword(e.target.value)} labelText="Your password"
								onFocus={() => setErrorPass(false)} onBlur={validatePassword} error={errorPass}/>

						</div>
						<div>
							<InputPair
								type={INPUT_TYPES.image}
								setInputValue={e => setImage(e.target.files[0])} labelText="Profile photo"/>
							{image && (
								<div className="mt-5">
									<p className="mb-3 text-sm text-gray-900 dark:text-gray-100">Photo preview:</p>
									<img
										className="rounded-md w-40 h-40 object-cover"
										src={URL.createObjectURL(image)}
										alt="new photo"/>
								</div>
							)}
						</div>
						<div>
							<InputPair
								type={INPUT_TYPES.select} inputValue={userRole}
								labelText="Role" selectOptions={[{id:userRole, attributes: {name:"User"}}]} disabled/>
						</div>
						<div>
							<InputPair
								type={INPUT_TYPES.select}
								inputValue={company?.id}
								labelText="Company" selectOptions={company ? [company] : []}
								disabled/>
						</div>
						<div className="flex justify-between items-center">
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
								<Link to="/login" className="text-orange-600 hover:underline">Already
									have an account?</Link>
							</div>
							<button type="submit"
								className=" text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center shadow-md tracking-wide">Register
							</button>
						</div>
						{user.error && (
							<div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
								<span className="font-medium">{user.error.name}</span> {user.error.message}
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	)
}

export default JoinPage