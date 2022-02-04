import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import PropTypes from "prop-types"
import {useMutation, useQuery, useQueryClient} from "react-query"
import api from "../../../api"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Alert from "../../shared/Alert"
import InputPair from "../../shared/InputPair"

const AddQuestion = (props) => { 
	const dispatch = useDispatch()
	let { id } = useParams()
	id = parseInt(id)
	const modeEdit = props.modeEdit
	const [uniqueOrders, setUniqueOrders] = useState({})
	const [questionName, setQuestionName] = useState("")
	const [questionType, setQuestionType] = useState("text")
	const [questionOrder, setQuestionOrder] = useState("")
	const navigate = useNavigate()
	const [questionsLength, setQuestionsLength] = useState(null)

	const queryClient = useQueryClient()

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)

	const TYPE = [
		{id: "text", attributes: {name: "text"}},
		{id: "long_text", attributes: {name: "long_text"}},
		{id: "image", attributes: {name: "image"}}
	]

	const {data, refetch} = useQuery("getAllQuestions", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				return api.getAllQuestions()
			}
			return false
		}
		return false
	}, {
		onSuccess: () => {
			//TODO: ni ovde ne radi
			queryClient.invalidateQueries("getQuestions")
		}
	})

	useEffect(() => {
		if (data && data.data && data.data.data) {
			const arr = data.data.data 
			arr.forEach(question => {
				const order = question.attributes.order
				setUniqueOrders((uniqueOrders) => {
					return {
						...uniqueOrders,
						[order]: true
					}
				})
				if (question.id === id) {
					setQuestionName(question.attributes.text)
					setQuestionType(question.attributes.type)
					setQuestionOrder(question.attributes.order)
					
				}
				setQuestionsLength(arr.length)
			})
		}
	}, [data])


	const {
		mutate
	} = useMutation((payload)=>{ 
		if (modeEdit === true) {
			api.editQuestions(payload)
		} else {
			api.addQuestions(payload)
		}
	})

	const _makeUniqueOrder = ()=> {
		let ord = 0
		let exit = false
		while (exit === false) {
			if (parseInt(ord) in uniqueOrders) {
				ord++
			} else {
				exit = true
			}
		}
		return ord
	}

	const [error, setError] = useState(false)
	const [alert, setAlert] = useState({ show: false })
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false })
		}, 3000)
	}


	const handleQuestion = (e) => {
		e.preventDefault()
		if(modeEdit === true) {
			// EDIT
			const payload = {
				id,
				text: questionName, 
				type: questionType,
				order: questionOrder
			}
			mutate(payload)
			setTimeout(() => {
				handleAlert({ type: "success", text: "Question edited successfully!" })
			}, 1000)
			setTimeout(() => {
				navigate("/questions")
			}, 2000)
			dispatch({type: "REFRESH"})
		} else {
			// ADD
			if(!questionName || questionName === "") {
				setError(true)
			} else {
				const payload = {
					companyID,
					text: questionName, 
					type: questionType,
					order: _makeUniqueOrder()
				}
				mutate(payload)
				setTimeout(() => {
					handleAlert({ type: "success", text: "Question added successfully!" })
				}, 1000)
				setTimeout(() => {
					navigate("/questions")
				}, 2000)
				dispatch({type: "REFRESH"})
			}
			
		}
	}



	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}
			<div className="ui main text-center">
				<h2 className="inline-block bg-white mb-3 rounded-lg shadow-lg text-gray-900 py-2 px-4">{modeEdit ? "Edit question" : "Add question"}</h2>

				<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
					<div
						className="bg-white  rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
						<form className="space-y-6" action="#">
							<div>
								<InputPair type="text" inputValue={questionName}
									setInputValue={e => setQuestionName(e.target.value)} labelText="Question name"></InputPair>
								{error && <span className="text-xs text-red-700">Please, enter a question name</span> }
							</div>
							<div>
								<InputPair type="select" inputValue={questionType}
									setInputValue={e => setQuestionType(e.target.value)}
									labelText="Question type" selectOptions={TYPE}/>
							</div>
							
							<button type="submit"
								className="w-full text-white inline-block bg-gray-900 hover:bg-gray-900 mb-5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={handleQuestion}>{modeEdit ? "Save" : "Add"}
							</button>
							<div>
								<Link to="/questions" className="text-sm hover:underline dark:text-blue-500">back</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)

}

export default AddQuestion

AddQuestion.propTypes = {
	modeEdit: PropTypes.bool,
}