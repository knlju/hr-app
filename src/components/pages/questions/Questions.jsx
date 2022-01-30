import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import api from "../../../api"
// import jwtDecode from "jwt-decode"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SingleQuestion from "./SingleQuestion"
import QuestionModal from "./QuestionModal"

export const Questions = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [modalId, setModalId] = useState(null)
	
	const routeFreshnes = useSelector(state=>state.user.routeFreshnes)


	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	
	const [questions, setQuestions] = useState([])

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
		}
	}, [data])

	console.log("00000000000000000000000",questions)

	const cbRefresh = ()=> (
		refetch()
	)

	// if (questions.length<=0) return <h3>Loading...</h3>

	return (
		<>
			
			{modalOpen && <QuestionModal setModalClose={() => {setModalOpen(false)}} modalId={modalId} />}
			<div className="flex flex-col items-center">
				<Link to={"/add-question"}><button className="bg-white hover:bg-gray-200 mb-3 rounded-lg shadow-lg text-violet-800 py-2 px-4">ADD QUESTION</button></Link>
			
				{questions.length > 0
					? questions.map((question) => {
						console.log(question)
						return (

							<SingleQuestion question={question}
								cbRefresh={cbRefresh}
								key={question.id}
								setModalOpen={(id) => {
									setModalOpen(true)
									setModalId(id)
								}}/>
						)
					})
					: null}
			</div>
		</>
	)
}
