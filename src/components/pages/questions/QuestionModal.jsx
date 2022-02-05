import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useMutation, useQuery } from "react-query"
import api from "../../../api"
import Modal from "../../shared/Modal"
import ReactDOM from "react-dom"
import Alert from "../../shared/Alert"
import InputPair from "../../shared/InputPair"
import { useGetCompanyQuestions } from "../../../hooks"

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
	// const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	const userProfile = useSelector(defaultState => defaultState.user.profile.id)

	const [error, setError] = useState(false)

	// const {data, refetch} = useQuery("getQuestions", async ()=>{
	// 		const token = await localStorage.getItem("token")
	// 		if (token) {
	// 			return api.getQuestions(companyID)
	// 		}
	// })
	const {data: company_questions} = useGetCompanyQuestions(companyID, {
		onSuccess: company_questions => {
			setQuestion(_extractQuestionById(modalId, company_questions.data.data))
			setQuestionType(_extractQuestionType(modalId, company_questions.data.data))
		}
	})

	// useEffect(() => {
	// 	if (data && data.data && data.data.data) {
	// 		setQuestion(_extractQuestionById(modalId, data.data.data))
	// 		setQuestionType(_extractQuestionType(modalId, data.data.data))
	// 	}
	// }, [data])


	const {
		mutate
	} = useMutation((payload)=>{ 
		if(questionType === "text" || questionType === "long_text") {
			
			api.addAnswer(payload)
				.then((response)=>{
					setTimeout(() => {
						setModalClose()
					}, 1000)
				})
			
		} else if(questionType === "image") {
			api.addImageAnswer(payload)
				.then((response)=>{
					setTimeout(() => {
						setModalClose()
					}, 1000)
					
				})
		}
	})
	const [alert, setAlert] = useState({ show: false })
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false })
		}, 3000)
	}

	const handleAnswer = (e)=> {
		e.preventDefault()
		if(questionType === "text" || questionType === "long_text") {
			if(!answer && answer === "") {
				setError(true)
			} else {
				const payload = {
					questionId: modalId,
					answer: answer,
					userProfile: userProfile
				}
				mutate(payload)
				
				setTimeout(() => {
					handleAlert({ type: "success", text: "Answer added successfully!" })
				}, 1000)
			}
		} else if(questionType === "image") {
			if(!answerImage && answerImage === null) {
				setError(true)
			} else {
				const payload = {
					questionId: modalId,
					imageToSend: answerImage,
					userProfile: userProfile
				}
				mutate(payload)
				setTimeout(() => {
					handleAlert({ type: "success", text: "Image added successfully!" })
				}, 1000)
			}
		}
		
	}

	let jsxAnswerInput = null
	if (questionType === "text" || questionType === "long_text") {
		jsxAnswerInput = (
			<div>
				<InputPair type="text" inputValue={answer}
					setInputValue={e => setAnswer(e.target.value)} labelText="Your answer"></InputPair>
				{error && <span className="text-xs text-red-700">Please, enter your answer.</span> }
			</div>
		)
	} else if (questionType === "image") {
		jsxAnswerInput = (
			<div>
				<InputPair type="image" inputValue={answerImage}
					setInputValue={e => setAnswerImage(e.target.files[0])} labelText="Place for your picture"></InputPair>
				{error && <span className="text-xs text-red-700">Please, upload your picture.</span> }
			</div>
		)
	}

	return ReactDOM.createPortal(
		
		<Modal closeModal={()=>{}}>
			
			<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-6 flex-col sm:my-8 sm:align-middle sm:max-w-lg sm:w-full text-gray-900 dark:text-white dark:bg-gray-900 dark:text-white">
				<div className="flex justify-between items-center mb-3">
					<h1 className="text-lg text-gray-900 dark:text-white">Answer The Question</h1>
					<button className=""
						onClick={() => {
							setModalClose()
						}}
					>
						<i className="fas fa-times text-gray-900 text-white"></i>
					</button>
				</div>
				<p className="text-base lg:text-lg text-gray-900 dark:text-white mb-5">{question}</p>

				{jsxAnswerInput}
				{alert.show && <Alert type={alert.type} text={alert.text} />}

				<div className="mt-5 flex justify-center items-center gap-6">
					<button className="text-white bg-red-700 hover:bg-red-500 rounded-lg px-4 py-2"
						onClick={() => {
							setModalClose()
						}}
					>
            Cancel
					</button>
					<button className="text-white bg-gray-900 hover:bg-gray-600 rounded-lg px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-500 " type="button" onClick={handleAnswer}>SUBMIT</button>
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