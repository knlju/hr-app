import React, {useState} from "react"
import {registerUser} from "../../utils"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"

const RegisterPage = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const isLoggedIn = useSelector(state => state.user.isLoggedIn)

	const submitRegistration = (e) => {
		e.preventDefault()
	}

	if(isLoggedIn) {
		return <Navigate to="/" />
	}

	return (
		<>
			<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
				<div className="bg-white shadow-md border border-gray-200 rounded-lg mx-auto w-2/5 max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" action="#" onSubmit={submitRegistration}>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
						<div>
							<label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your name</label>
							<input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required="" value={name} onChange={(e)=> setName(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
							<input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required="" value={email} onChange={(e)=> setEmail(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your password</label>
							<input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="" value={password} onChange={(e)=> setPassword(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="formFile" className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Profile photo</label>
							<input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" type="file" id="formFile" />
						</div>
						<div className="flex justify-between items-center">
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
								<a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Allready have an account?</a>
							</div>
							<button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => registerUser({name, email, password, b64image: "cicada 3301"})}>Register</button>
								
						</div>
					</form>
				</div>
			</div>	
		</>
	)
}

export default RegisterPage