import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import api from "../../../api"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SingleQuestion from "./SingleQuestion"
import QuestionModal from "./QuestionModal"
import DraggableList from "./draganddrop/list/DraggableList"
import SpinnerLoader from "../../shared/SpinnerLoader"
import { useGetCompanyQuestions } from "../../../hooks"

export const Questions = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [modalId, setModalId] = useState(null)

	const routeFreshnes = useSelector(state=>state.user.routeFreshnes)

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	
	const [questions, setQuestions] = useState([])

	const {data, refetch, isLoading} = useQuery("getQuestions", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				return api.getQuestions(companyID)
			}
			return false
		}
		return false
	})

	// const {data, refetch, isLoading} = useGetCompanyQuestions(isLoggedIn, companyID, {
	// 	onSuccess: data => {
	// 		const sortedQuestions = data.data.data.sort(compare)
	// 		setQuestions(sortedQuestions)
	// 	}
	// })


	function compare(a, b) {
		if (a.attributes.order < b.attributes.order) {
			return -1
		}
		if (a.attributes.order > b.attributes.order) {
			return 1
		}
		return 0
	}
	
	useEffect(() => {
		refetch()
	}, [routeFreshnes])
	
	useEffect(() => {
		if (data) {
			const sortedQuestions = data.data.data.sort(compare)
			setQuestions(sortedQuestions)
			// setQuestions(data.data.data)
		}
	}, [data])

	const cbRefresh = ()=> (
		refetch()
	)

	const DraggableQuestion = question => ( 
		<SingleQuestion question={question}
			cbRefresh={cbRefresh}
			key={question.id}
			setModalOpen={(id) => {
				setModalOpen(true)
				setModalId(id)
			}}
		/>
	)

	if (isLoading) {
		return <SpinnerLoader/>
	}


	return (
		<>
			{modalOpen && <QuestionModal setModalClose={() => {setModalOpen(false)}} modalId={modalId} />}
			<div className="flex flex-col items-center full md:w-4/5 mx-auto">
				<Link to={"/add-question"}><button className="bg-white hover:bg-gray-200 mb-5 rounded-lg shadow-lg text-violet-800 py-2 px-4">ADD QUESTION</button></Link>
			
				{questions.length > 0 ? <DraggableList
					data={questions}
					renderItemContent={(item) => DraggableQuestion(item)}
				/> : "There is no posted questions."}	

			</div>
		</>
	)
}
