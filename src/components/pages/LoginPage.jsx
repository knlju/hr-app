import React, {useEffect, useState} from "react"
import {
	useDispatch, useSelector,
	// useSelector
} from "react-redux"
import {loginStart} from "../../redux/actions/actions"
import {
	Link,
	// Navigate
} from "react-router-dom"
import Loader from "../shared/Loader"
import InputPair from "../shared/InputPair"
import { INPUT_TYPES } from "../../constants"
import Alert from "../shared/Alert"

const LoginPage = () => {

	const dispatch = useDispatch()

	const user = useSelector(state => state.user)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		console.log("-----------------------------------------")
		console.log(user)
	}, [user])

	const [errorEmail, setErrorEmail] = useState(false)
	const [errorPass, setErrorPass] = useState(false)
	const [alert, setAlert] = useState({show: false})
	const handleAlert = ({type, text}) => {
		setAlert({show: true, type, text})
		setTimeout(() => {
			setAlert({show: false})
		}, 3000)
	}

	const emailRegEx =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
			setTimeout(() => {
				handleAlert({type: "success", text: "You are successfully logged in!"})
			}, 1000)
			setTimeout(() => {
				dispatch(loginStart(data))
			}, 2000)
		} 
		
	}
	email

	return (
		<>
			{user.isLoading && <Loader />}
			{alert.show && <Alert type={alert.type} text={alert.text}/>}
			<div>
				<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
					<div
						className="bg-white shadow-md border border-gray-200 rounded-lg w-full lg:w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
						<form className="space-y-4" action="#">
							<h3 className="text-lg text-center font-medium text-gray-900 dark:text-white">Sign in to our
                                platform</h3>
							<div>
								<InputPair onFocus={()=>setErrorEmail(false)} onBlur={validateEmail} error={errorEmail} type={INPUT_TYPES.email} inputValue={email}
									setInputValue={e => setEmail(e.target.value)} labelText="Your
                                    email"/>
							</div>
							<div>
								<InputPair type={INPUT_TYPES.password} inputValue={password}
									setInputValue={e => setPassword(e.target.value)} labelText="Your
                                    password" onFocus={()=>setErrorPass(false)} onBlur={validatePassword} error={errorPass}/>
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
