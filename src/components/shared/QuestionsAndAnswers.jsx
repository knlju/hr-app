import React, {useState} from "react"
import {useAnswersQuery, useQuestionsQuery} from "../../hooks"
import SpinnerLoader from "./SpinnerLoader"
import PropTypes from "prop-types"

function QuestionsAndAnswers({profileId, companyId}) {

	const {data: questions, isLoading: questionsLoading, isError: questionsError} = useQuestionsQuery(companyId, {
		onSuccess: () => answers && questions && mapAnswersToQuestions(questions, answers)
	})
	const {data: answers, isLoading: answersLoading, isError: answersError} = useAnswersQuery(profileId, {
		onSuccess: () => answers && questions && mapAnswersToQuestions(questions, answers)
	})

	const [mappedQuestionsAndAnswers, setMappedQuestionsAndAnswers] = useState([])

	function mapAnswersToQuestions(questions, answers) {
		setMappedQuestionsAndAnswers([])
	}

	if (questionsLoading || answersLoading) {
		return <SpinnerLoader/>
	}

	if (questionsError || answersError) {
		return <p>Loading error...</p>
	}

	return (
		<code>
			{mappedQuestionsAndAnswers.map(pair => <p key={pair.id}>pair</p>)}
		</code>
	)
}

QuestionsAndAnswers.propTypes = {
	profileId: PropTypes.number,
	companyId: PropTypes.number,
}

export default QuestionsAndAnswers