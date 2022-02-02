import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import PropTypes from "prop-types"
import {useMutation, useQuery, useQueryClient} from "react-query"
import api from "../../../api"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

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
			dispatch({type: "REFRESH"})
			navigate("/questions")
		} else {
			// ADD
			const payload = {
				companyID,
				text: questionName, 
				type: questionType,
				order: _makeUniqueOrder()
			}
			mutate(payload)

			if (questionName === "" && questionType) {
				// ??? PROVERITI
				alert("ALl the fields are mandatory!")
				return
			}
			dispatch({type: "REFRESH"})
			navigate("/questions")
		}
	}



	return (
		<div className="ui main text-center">
			<h2 className="inline-block bg-white mb-3 rounded-lg shadow-lg text-violet-800 py-2 px-4">{modeEdit ? "Edit question" : "Add question"}</h2>

			<div className="flex justify-between items-center mx-auto max-w-screen-lg py-10">
				<div
					className="bg-white  rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
					<form className="space-y-6" action="#">
						<div>
							<label htmlFor="name"
								className="text-lg font-medium text-violet-800 block mb-2 dark:text-gray-300">Question name</label>
							<input type="text" name="name" id="name"
								className="bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="New Question" required="" value={questionName}
								onChange={(e) => setQuestionName(e.target.value)}/>
						</div>
						<div>
							<label htmlFor="questionType"
								className="form-label text-lg font-medium text-violet-800 block mb-2 dark:text-gray-300">Question type</label>
							<select
								className="bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								value={questionType} onChange={(e) => setQuestionType(e.target.value)} id="questionType">
								<option value="text">Text</option>
								<option value="long_text">Long text</option>
								<option value="image">Image</option>
							</select>
						</div>
							
						<button type="submit"
							className="w-full text-white inline-block bg-violet-800 hover:bg-violet-600 mb-5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={handleQuestion}>ADD
						</button>
						<div>
							<Link to="/questions" className="text-sm hover:underline dark:text-blue-500">back</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)

}

export default AddQuestion

AddQuestion.propTypes = {
	modeEdit: PropTypes.bool,
}