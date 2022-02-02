import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMutation, useQuery } from "react-query"
import api from "../../../api"
import Modal from "../../shared/Modal"
import ReactDOM from "react-dom"

const _extractQuestionById = (id, arr) => {
	let selected = null
	arr.forEach(question=>{
		if(question.id === id) {
			selected = question.attributes.text
		}
	})
	return selected
}
const _extractQuestionType = (id, arr) => {
	let type = null
	arr.forEach(question=>{
		if(question.id === id) {
			type = question.attributes.type
		}
	})
	return type
}

function QuestionModal({ setModalClose, modalId }) {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const [answerImage, setAnswerImage] = useState(null)
	const [questionType, setQuestionType] = useState("")
	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	const userProfile = useSelector(defaultState => defaultState.user.profile.id)

	const {data, refetch} = useQuery("getQuestions", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				return api.getQuestions(companyID)
			}
			return false
		}
		return false
	})

	useEffect(() => {
		if (data && data.data && data.data.data) {
			setQuestion(_extractQuestionById(modalId, data.data.data))
			setQuestionType(_extractQuestionType(modalId, data.data.data))
		}
	}, [data])


	const {
		mutate
	} = useMutation((payload)=>{ 
		if(questionType === "text" || questionType === "long_text") {
			api.addAnswer(payload)
				.then((response)=>{
					setModalClose()
				})
		} else if(questionType === "image") {
			api.addImageAnswer(payload)
				.then((response)=>{
					setModalClose()
				})
		}
	})

	const handleAnswer = (e)=> {
		e.preventDefault()
		if(questionType === "text" || questionType === "long_text") {
			const payload = {
				questionId: modalId,
				answer: answer,
				userProfile: userProfile
			}
			mutate(payload)
		} else if(questionType === "image") {
			const payload = {
				questionId: modalId,
				imageToSend: answerImage,
				userProfile: userProfile
			}
			mutate(payload)
		}
		
	}

	let jsxAnswerInput = null
	if (questionType === "text" || questionType === "long_text") {
		jsxAnswerInput = (
			<div>
				<label htmlFor="answer"
					className="text-sm font-medium text-violet-800 block mb-0 dark:text-gray-300">Place for you answer</label>
				<input type="text" name="answer"
					className="bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="Your answer..." required="" value={answer}
					onChange={(e) => {setAnswer(e.target.value)}}/>
			</div>
		)
	} else if (questionType === "image") {
		jsxAnswerInput = (
			<div>
				<label htmlFor="formFile"
					className="form-label text-sm font-medium text-violet-800 block mb-0 dark:text-gray-300">Place for your picture</label>
				<input
					className="bg-gray-50 border border-gray-300 text-violet-800 text-sm lg:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white 
						relative
						file:bg-blue-500
						file:rounded-md file:text-white file:px-4 file:py-1
						file:absolute file:right-1 file:top-1"
					type="file" id="formFile" accept="image/*" onChange={(e) => setAnswerImage(e.target.files[0])}/>
			</div>
		)
	}

	return ReactDOM.createPortal(
		<Modal closeModal={()=>{}}>
			<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-6 flex-col sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				<div className="flex justify-between items-center mb-3">
					<h1 className="text-lg text-violet-800">Answer The Question</h1>
					<button className=""
						onClick={() => {
							setModalClose()
						}}
					>
						<i className="fas fa-times text-violet-800"></i>
					</button>
				</div>
				<p className="text-base lg:text-lg text-violet-800 mb-5">{question}</p>

				{jsxAnswerInput}

				<div className="mt-5 flex justify-center items-center gap-6">
					<button className="text-white bg-red-700 hover:bg-red-500 rounded-lg px-4 py-2"
						onClick={() => {
							setModalClose()
						}}
					>
            Cancel
					</button>
					<button className="text-white bg-violet-800 hover:bg-violet-600 rounded-lg px-4 py-2" type="button" onClick={handleAnswer}>SUBMIT</button>
				</div>
			</div>
		</Modal>,
		document.getElementById("portal")
	)
}

export default QuestionModal

QuestionModal.propTypes = {
	modalId: PropTypes.number,
	setModalClose: PropTypes.func
}