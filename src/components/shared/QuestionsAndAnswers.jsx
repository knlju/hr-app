import React, {useEffect, useState} from "react"
import {
	useAnswersQuery,
	usePostAnswerMutation,
	usePostImageMutation,
	useQuestionsQuery,
	useUpdateAnswerMutation
} from "../../hooks"
import SpinnerLoader from "./SpinnerLoader"
import PropTypes from "prop-types"
import InputPair from "./InputPair"
import Loader from "./Loader"

function QuestionsAndAnswers({profileId, companyId}) {

	const {
		data: questions,
		isLoading: questionsLoading,
		isError: questionsError,
		refetch: fetchQuestions
	} = useQuestionsQuery(companyId, {
		onSuccess: () => {
			answers && questions && mapAnswersToQuestions(questions, answers)
		},
		enabled: false
	})

	const {
		data: answers,
		isLoading: answersLoading,
		isError: answersError,
		refetch: fetchAnswers
	} = useAnswersQuery(profileId, {
		onSuccess: () => {
			answers && questions && mapAnswersToQuestions(questions, answers)
		},
		enabled: false
	})

	const {
		isError: updateAnswerError,
		isLoading: updateAnswerLoading,
		mutate: updateAnswer,
		mutateAsync: updateAnswerAsync
	} = useUpdateAnswerMutation({
		// onSuccess: fetchAnswers()
	})
	const {
		isError: postAnswerError,
		isLoading: postAnswerLoading,
		mutate: postAnswer,
		mutateAsync: postAnswerAsync
	} = usePostAnswerMutation({
		// onSuccess: fetchAnswers()
	})

	const {
		isError: uploadImageError,
		isLoading: uploadImageLoading,
		mutate: uploadImage,
		mutateAsync: uploadImageAsync
	} = usePostImageMutation()

	const [mappedQuestionsAndAnswers, setMappedQuestionsAndAnswers] = useState([])

	useEffect(() => {
		fetchAnswers()
		fetchQuestions()
	}, [])

	useEffect(() => {
		console.log("rerender")
	})

	function updatePair(e, pair) {
		if (pair.attributes.type === "image") {
			setMappedQuestionsAndAnswers(oldQA => oldQA.map(question => {
				if (question.id !== pair.id) return question
				const newQuestion = {
					...question,
					changed: true
				}
				if (!newQuestion.attributes.answers.data[0]) {
					newQuestion.attributes.answers.data = [{
						attributes: {
							answer: URL.createObjectURL(e.target.files[0]),
							file: e.target.files[0],
							question: question.id,
							profile: profileId,
						}
					}]
				} else {
					newQuestion.attributes.answers.data[0] = {
						...newQuestion.attributes.answers.data[0],
						attributes: {
							...newQuestion.attributes.answers.data[0].attributes,
							file: e.target.files[0],
							inputValue: URL.createObjectURL(e.target.files[0]),
						}
					}
				}
				return newQuestion
			}))

		} else {
			setMappedQuestionsAndAnswers(oldQA => oldQA.map(question => {
				if (question.id !== pair.id) return question
				const newQuestion = {
					...question,
					changed: true
				}
				if (!newQuestion.attributes.answers.data[0]) {
					newQuestion.attributes.answers.data = [{
						attributes: {
							answer: e.target.value,
							question: question.id,
							profile: profileId,
						}
					}]
				} else {
					newQuestion.attributes.answers.data[0] = {
						...newQuestion.attributes.answers.data[0],
						attributes: {
							...newQuestion.attributes.answers.data[0].attributes,
							inputValue: e.target.value,
						}
					}
				}
				return newQuestion
			}))
		}
	}

	useEffect(() => {
		console.log({mappedQuestionsAndAnswers})
	}, [mappedQuestionsAndAnswers])

	function saveAnswers(e) {
		e.preventDefault()
		mappedQuestionsAndAnswers.forEach(async pair => {
			if (!pair.changed) return
			// sets changed to false to stop additional updates on save
			const mockEvent = {
				target: {
					value: pair.attributes.answers.data[0].attributes.answer
				}
			}
			const {
				changed,
				...newPair
			} = pair
			if (pair.attributes.type !== "image"){
				updatePair(mockEvent, newPair)
			}

			// no id means it's a new answer
			if (!Object.prototype.hasOwnProperty.call(pair.attributes.answers.data[0], "id")) {
				const currentAnswer = pair.attributes.answers.data[0]

				const payload = {
					questionId: currentAnswer.attributes.question,
					answer: currentAnswer.attributes.answer,
					userProfile: currentAnswer.attributes.profile
				}

				if (pair.attributes.type === "image") {
					const uploadImageResponse = await uploadImageAsync(currentAnswer.attributes.file)
					payload.answer = uploadImageResponse.data[0].url
				}

				postAnswer(payload)
			} else {
				const currentAnswer = pair.attributes.answers.data[0]
				const payload = {
					answerId: currentAnswer.id,
					questionId: currentAnswer.attributes.question,
					answer: currentAnswer.attributes.answer,
					userProfile: currentAnswer.attributes.profile
				}

				if (pair.attributes.type === "image") {
					const uploadImageResponse = await uploadImageAsync(currentAnswer.attributes.file)
					payload.answer = uploadImageResponse.data[0].url
				}
                
				updateAnswer(payload)
			}
		})
	}

	function mapAnswersToQuestions(questions, answers) {
		const newQuestions = questions.data.data.map(question => {
			question.attributes.answers.data = question.attributes.answers.data.filter(answer => {
				return answers.data.data.some(answerInAnswers => {
					return answerInAnswers.id === answer.id
				})
			})
			return question
		})
		setMappedQuestionsAndAnswers(newQuestions)
	}

	// const [errorQuestion, setErrorQuestion] = useState(false)
	// const validateQuestion = () => {
	// 	if (!userName || userName === "") {
	// 		setErrorQuestion("Question Name can't be empty!")
	// 		return false
	// 	} 
	// 	else {
	// 		setErrorQuestion(false)
	// 		return true
	// 	}
	// }

	if (questionsLoading || answersLoading || uploadImageLoading) {
		return <SpinnerLoader/>
	}

	if (questionsError || answersError || uploadImageError) {
		return <p>Loading error...</p>
	}

	return (
		<>
			{updateAnswerLoading || postAnswerLoading && <Loader/>}
			{updateAnswerError || postAnswerError && <p>Update error... :(</p>}
			<div
				className="bg-white shadow-md rounded-lg w-full max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
				<form onSubmit={saveAnswers}>
					{mappedQuestionsAndAnswers.map(pair => {
						return (
							<InputPair
								key={pair.id}
								labelText={pair.attributes.text}
								inputValue={pair.attributes.answers?.data[0]?.attributes.answer}
								type={pair.attributes?.type}
								setInputValue={e => updatePair(e, pair)}
								// onFocus={()=>setErrorQuestion(false)} 
								// onBlur={validateQuestion} 
								// error={errorQuestion}
							/>
						)
					})}
					<button type="submit"
						// disabled={disabled}
						className="disabled:opacity-70 text-white w-full bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center"
					>
                        Save
					</button>
				</form>
			</div>
		</>
	)
}

QuestionsAndAnswers.propTypes = {
	profileId: PropTypes.number,
	companyId: PropTypes.number,
}

export default QuestionsAndAnswers