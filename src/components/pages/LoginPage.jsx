import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {loginError, loginStart} from "../../redux/actions/actions"
import {Link} from "react-router-dom"
import Loader from "../shared/Loader"
import InputPair from "../shared/InputPair"
import {INPUT_TYPES} from "../../constants"
import {useToast} from "../../contexts/ToastProvider"

const LoginPage = () => {

	const dispatch = useDispatch()

	const user = useSelector(state => state.user)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorEmail, setErrorEmail] = useState(false)
	const [errorPass, setErrorPass] = useState(false)
	const addToast = useToast()

	// TODO: kako otkriti promenu u redux state-u
	// TODO: prikazati toast alert ako je korisnik ulogovan
	useEffect(() => {
		if (user.isLoggedIn) {
			alert("logged in")
			addToast({type: "success", text: "You are successfully logged in!"})
		}
	}, [user.isLoggedIn])

	const validate = () => {
		const emailValid = validateEmail()
		const passwordValid = validatePassword()

		return emailValid && passwordValid
	}

	const validateEmail = () => {
		if (!email || email === "") {
			setErrorEmail("Email cant be empty!")
			return false
		}
		// Commented because we use made up emails, uncomment for prod
		// else if (emailRegEx){
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
			setErrorPass("Password cant be empty!")
			return false
		}
		// else if (regexPassword){}
		else {
			setErrorPass(false)
			return true
		}
	}

	const handleLogIn = e => {
		e.preventDefault()
		if (validate()) {
			const data = {
				email,
				password
			}
			// setTimeout(() => {
			// 	addToast({type: "success", text: "You are successfully logged in!"})
			// }, 1000)
			// setTimeout(() => {
			dispatch(loginStart(data))
			// }, 2000)
		}
	}

	if (user.error) {
		addToast({type: "danger", text: user.error.message})
		dispatch(loginError(null))
	}

	return (
		<>
			{user.isLoading && <Loader/>}
			<div>
				<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
					<div
						className="bg-white shadow-md border border-gray-200 rounded-lg w-full lg:w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
						<form className="space-y-4" action="#">
							<h3 className="text-lg text-center font-medium text-gray-900 dark:text-white">Sign in to our
                                platform</h3>
							<div>
								<InputPair onFocus={() => setErrorEmail(false)} onBlur={validateEmail}
									error={errorEmail} type={INPUT_TYPES.email} inputValue={email}
									setInputValue={e => setEmail(e.target.value)} labelText="Your
                                    email"/>
							</div>
							<div>
								<InputPair type={INPUT_TYPES.password} inputValue={password}
									setInputValue={e => setPassword(e.target.value)} labelText="Your
                                    password" onFocus={() => setErrorPass(false)} onBlur={validatePassword}
									error={errorPass}/>
							</div>
							<button type="submit"
								className="w-full text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center shadow-md tracking-wide"
								onClick={handleLogIn}>Login to your account
							</button>
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">Not registered?
								<Link to="/register" className="ml-2 text-orange-600 hover:underline">Create
                                    account</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
