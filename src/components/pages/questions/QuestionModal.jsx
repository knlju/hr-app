import React, { useEffect } from "react"
import PropTypes from "prop-types"
import "./Modal.css"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMutation, useQuery } from "react-query"
import api from "../../../api"

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
	// const [answerLongText, setAnswerLongText] = useState("")
	const [answerImage, setAnswerImage] = useState(null)
	const [questionType, setQuestionType] = useState("")
	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	const userProfile = useSelector(defaultState => defaultState.user.profile.id)
	console.log("-----------------------------",userProfile)



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
			// const text = 
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
				// if (true) { // TODO treba provera da li je response uspeo
					setModalClose()
				// }
				})
		} else if(questionType === "image") {
			api.addImageAnswer(payload)
				.then((response)=>{
				// if (true) { // TODO treba provera da li je response uspeo
					setModalClose()
				// }
				})
		}
	})

	const handleAnswer = (e)=> {
		e.preventDefault()
		console.log("klik za answer")
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
				// answer: answerImage,
				imageToSend: answerImage,
				userProfile: userProfile
			}
			mutate(payload)
		}
		
	}

	//
	let jsxAnswerInput = null
	if (questionType === "text" || questionType === "long_text") {
		jsxAnswerInput = (
			<div>
				<label htmlFor="answer"
					className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Question name</label>
				<input type="text" name="answer"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="odgovor" required="" value={answer}
					onChange={(e) => {setAnswer(e.target.value)}}/>
			</div>
		)
	} else if (questionType === "image") {
		jsxAnswerInput = (
			<div>
				<label htmlFor="formFile"
					className="form-label text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Place for your picture</label>
				<input
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white 
						relative
						file:bg-blue-500
						file:rounded-md file:text-white file:px-4 file:py-1
						file:absolute file:right-1 file:top-1"
					type="file" id="formFile" accept="image/*" onChange={(e) => setAnswerImage(e.target.files[0])}/>
			</div>
		)
	}

	//
    
	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button
						onClick={() => {
							setModalClose()
						}}
					>
            X
					</button>
				</div>
				<div className="title">
					<h1>Are You Sure You Want to Continue?</h1>
				</div>
				<p>{question}</p>

				{jsxAnswerInput}

				<div className="footer">
					<button
						onClick={() => {
							setModalClose()
						}}
						id="cancelBtn"
					>
            Cancel
					</button>
					<button type="button" onClick={handleAnswer}>SUBMIT</button>
				</div>
			</div>
		</div>
	)
}

export default QuestionModal

QuestionModal.propTypes = {
	modalId: PropTypes.number,
	setModalClose: PropTypes.func
}
