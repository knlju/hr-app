import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {createCompanySuccess, fetchCompaniesStart, loginError, registerStart} from "../../redux/actions/actions"
import PropTypes from "prop-types"
import Loader from "../shared/Loader"
import InputPair from "../shared/InputPair"
import {COMPANIES_ANNEX, INPUT_TYPES, ROLE_SELECT} from "../../constants"
import {useToast} from "../../contexts/ToastProvider"

import { useFormik } from "formik"
import * as Yup from "yup"



const CreateNewCompany = ({
	companyName,
	setCompanyName,
	companySlug,
	setCompanySlug,
	// setErrorCompanyName,
	// setErrorCompanySlug,
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
					setInputValue={setCompanyName} labelText="Company
                    name" placeholder="Company name..." 
					// onFocus={() => setErrorCompanyName(false)}
					onBlur={validateCompanyName} error={errorCompanyName}/>
			</div>
			<div>
				<InputPair type={INPUT_TYPES.text} inputValue={companySlug}
					setInputValue={setCompanySlug} labelText="Company slug"
					placeholder="Company slug..." 
					// onFocus={() => setErrorCompanySlug(false)}
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
	// const [username, setUsername] = useState("")
	// const [email, setEmail] = useState("")
	// const [password, setPassword] = useState("")
	const [companyId, setCompanyId] = useState("-1")
	// const [userRole, setUserRole] = useState("company_user")
	// const [image, setImage] = useState(null)
	// const [companyName, setCompanyName] = useState("")
	// const [companySlug, setCompanySlug] = useState("")


	const [errorCompany, setErrorCompany] = useState(false)

	const companies = useSelector(state => state.companies)
	const user = useSelector(state => state.user)
	const addToast = useToast()

	//formik
	const lowercaseRegex = /(?=.*[a-z])/
	const uppercaseRegex = /(?=.*[A-Z])/
	const numericRegex = /(?=.*[0-9])/

	const SignupSchema = Yup.object().shape({
		username: Yup.string()
			.min(2, "Too Short!")
			.required("Username can't be empty!"),
		email: Yup.string()
			.lowercase()
			.email("Must be a valid email!")
			// .notOneOf(emailAddresses, "Email already taken!")
			.required("Email can't be empty!!"),
		password: Yup.string()
			.matches(lowercaseRegex, "One lowercase required!")
			.matches(uppercaseRegex, "One uppercase required!")
			.matches(numericRegex, "One number required!")
			.min(8, "Minimum 8 characters required!")
			.required("Password can't be empty!"),
		companyId: Yup.string()
			.required("Please, choose your company!"),
		companyNew: Yup.array().of(
			Yup.object().shape({
				companyName: Yup.string()
					.required("Company Name is required"),
				companySlug: Yup.string()
					.required("Company Slug is required")
			})
		)
	})

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "", 
			companyId: "",
			userRole: "",
			image: null,
			companyNew: "0",
			companyName: "",
			companySlug: ""
		},
		validationSchema: SignupSchema,
		onSubmit: values => {
			let company = companyId
			const payload = {username: values.username, email: values.email, password:values.password, company, userRole: values.userRole}
			if (parseInt(companyId) < 1) {
				company = {name: values.companyName, slug: values.companySlug}
				payload.company = company
			}
			if (values.image) {
				payload.image = values.image
			}
			dispatch(registerStart(payload))
		},
	})

	console.log("------formik values",formik.values)
	//formik

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCompaniesStart())
	}, [])


	function handleCompanyChange(e) {
		setCompanyId(e.target.value)
		dispatch(createCompanySuccess({
			data: {
				data: companies.companies.find(company => company.id === parseInt(e.target.value))
			}
		}))
	}


	// const validateCompany = () => {
	// 	if (companyId === "-1") {
	// 		setErrorCompany("Please, choose your company!")
	// 		return false
	// 	} else if (companyId === "0") {
	// 		// validateCompanyName()
	// 		// validateCompanySlug()
	// 	} else {
	// 		setErrorCompany(false)
	// 		return true
	// 	}
	// }


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
					<form className="space-y-6" action="#"

						//  onSubmit={submitRegistration}

						onSubmit={formik.handleSubmit}>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
						<div>
							<InputPair type={INPUT_TYPES.text} inputValue={formik.values.username}
								setInputValue={formik.handleChange} labelText="Your name" placeholder="Your name..." 
								onBlur={formik.handleBlur} error={formik.errors.username}/>
								
						</div>
						<div>
							<InputPair type={INPUT_TYPES.email} inputValue={formik.values.email}
								setInputValue={formik.handleChange} labelText="Your email"
								onBlur={formik.handleBlur} error={formik.errors.email}/>
						</div>
						<div>
							<InputPair type={INPUT_TYPES.password} inputValue={formik.values.password}
								setInputValue={formik.handleChange} labelText="Your password" 
								// onFocus={()=>setErrorPass(false)} 
								onBlur={formik.handleBlur} error={formik.errors.password}/>
								
						</div>
						<div>
							<InputPair type={INPUT_TYPES.image}
								setInputValue={formik.handleChange} labelText="Profile photo"/>
							{formik.values.image && (
								<div className="mt-5">
									<p className="mb-3 text-sm text-gray-900 dark:text-gray-100">Photo preview:</p>
									<img className="rounded-md w-40 h-40 object-cover" src={URL.createObjectURL(formik.values.image)} alt="new photo"/>
								</div>
							)}
						</div>
						<div>
							<InputPair type={INPUT_TYPES.select} inputValue={formik.values.userRole}
								setInputValue={formik.handleChange}
								labelText="Role" selectOptions={ROLE_SELECT}/>
						</div>
						<div>
							<InputPair type={INPUT_TYPES.select} inputValue={companyId}
								setInputValue={handleCompanyChange}
								labelText="Company" selectOptions={COMPANIES_ANNEX.concat(companies?.companies)} 
								// onFocus={()=>setErrorCompany(false)} 
								onBlur={formik.handleBlur} 
								error={formik.errors.companyId}/>
						</div>
						{(companyId === "0") && (
							<CreateNewCompany
								companyName={formik.values.companyName}
								companySlug={formik.values.companySlug}
								setCompanyName={formik.handleChange}
								setCompanySlug={formik.handleChange}
								// setErrorCompanyName={setErrorCompanyName}
								// setErrorCompanySlug={setErrorCompanySlug}
								validateCompanyName={formik.handleBlur}
								validateCompanySlug={formik.handleBlur}
								errorCompanyName={formik.errors.companyName}
								errorCompanySlug={formik.errors.companySlug}
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