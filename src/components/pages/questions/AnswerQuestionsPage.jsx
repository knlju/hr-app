import React, { useState } from "react"
import { useMutation } from "react-query"
import api from "../../../api"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SpinnerLoader from "../../shared/SpinnerLoader"
import { useGetCompanyQuestions } from "../../../hooks"
import "../../../styles/CustomStyles.css"
import InputPair from "../../shared/InputPair"
import Alert from "../../shared/Alert"

export const AnswerQuestionsPage = () => {
	const companyID = useSelector(defaultState => defaultState.user?.profile?.attributes.company.data.id)
	const userProfile = useSelector(defaultState => defaultState.user?.profile?.id)
	const [index,setIndex] = useState(0)
	const [questions, setQuestions] = useState([index])
	const [answer, setAnswer] = useState("")
	const [answerImage, setAnswerImage] = useState(null)
	const [error, setError] = useState(false)


	const {data: company_questions, isLoading} = useGetCompanyQuestions(companyID, {
		onSuccess: company_questions => {
			const sortedQuestions = company_questions.data.data.sort(compare)
			setQuestions(sortedQuestions)
		}
	})
	

	function compare(a, b) {
		if (a.attributes.order < b.attributes.order) {
			return -1
		}
		if (a.attributes.order > b.attributes.order) {
			return 1
		}
		return 0
	}

	

	const {id, attributes} = questions[index]
	const text = attributes?.text
	const questionType = attributes?.type
	const questionId = id

	const checkNumber = (number) =>{
		if(number > questions.length - 1){
			return 0
		}
		if(number < 0){
			return questions.length - 1
		}

		return number
	}

	const prevPerson = ()=>{
		setIndex((index)=>{
			let newIndex = index -1
			return checkNumber(newIndex)
		})
	}
   

	const nextPerson = ()=>{
		setIndex((index)=>{
			let newIndex = index + 1
			return checkNumber(newIndex)
		})
	}


	const {
		mutate
	} = useMutation((payload)=>{ 
		if(questionType === "text" || questionType === "long_text") {
			api.addAnswer(payload)
			
		} else if(questionType === "image") {
			api.addImageAnswer(payload)
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
					questionId: questionId,
					answer: answer,
					userProfile: userProfile
				}
				mutate(payload)
				
				setTimeout(() => {
					handleAlert({ type: "success", text: "Answer added successfully!" })
				}, 1000)
				setAnswer("")
			}
		} else if(questionType === "image") {
			if(!answerImage && answerImage === null) {
				setError(true)
			} else {
				const payload = {
					questionId: questionId,
					imageToSend: answerImage,
					userProfile: userProfile
				}
				mutate(payload)
				setTimeout(() => {
					handleAlert({ type: "success", text: "Image added successfully!" })
				}, 1000)
				setAnswerImage(null)
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

	if (isLoading) {
		return <SpinnerLoader/>
	}

	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}
			<div className="flex justify-between align-top mx-auto max-w-screen-lg py-10">
				<div className="relative overflow-hidden rounded-lg shadow-lg w-64 md:w-2/3 m-auto bg-white p-5">
					<div className="flex items-center justify-between mb-8 text-gray-900 dark:bg-gray-900 dark:text-white">
						<p>Please answer these questions?</p>
						<span >
							<span>Question {index + 1}</span>/{questions.length}
						</span>
					</div>
					<div className="">
						<p className="text-base lg:text-lg text-gray-900 mb-5 capitalize">{text}</p>
						{jsxAnswerInput}
						<button className="text-gray-900 bg-white hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white rounded-lg px-5 py-2 mt-4 text-sm shadow-xl" type="button" onClick={handleAnswer}>Submit</button>
					</div>
					<div className="flex items-center justify-center gap-5">
						<button className="cursor-pointer tooltip" onClick={prevPerson}>
							<i className="fas fa-caret-square-left text-gray-900 hover:text-gray-600 text-3xl"></i>
							<span className="tooltiptext">prev question</span>
						</button>
						<button className="cursor-pointer tooltip" onClick={nextPerson}>
							<i className="fas fa-caret-square-right text-gray-900 hover:text-gray-600 text-3xl"></i>
							<span className="tooltiptext">next question</span>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
