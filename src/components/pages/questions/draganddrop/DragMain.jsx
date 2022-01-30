// import { listData } from './assets/listData'

import DraggableList from "./list/DraggableList"
import Card from "./card/Card"
import { useSelector } from "react-redux"
import { useQuery } from "react-query"
import api from "../../../../api"
import { useEffect } from "react"
import { useState } from "react"
import { listData } from "./assets/listData"

function DragMain() {
	const routeFreshnes = useSelector(state=>state.user.routeFreshnes)

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)

	// const [listData, setListData]  = useState([])

	// const {data:list_q, refetch} = useQuery("getQuestions", async ()=>{
	// 	if (isLoggedIn) {
	// 		const token = await localStorage.getItem("token")
	// 		if (token) {
	// 			return api.getQuestions()
	// 		}
	// 		return false
	// 	}
	// 	return false
	// })
	
	// useEffect(() => {
	// 	refetch()
	// }, [routeFreshnes])
	
	// useEffect(() => {
	// 	if (list_q) {
	// 		setListData(list_q.data.data)
	// 	}
	// }, [list_q])

	// console.log("--------------------", list_q)
	// console.log("----------0000000000----------", listData)

	// if(!list_q) return <div>loading...</div>

	// console.log("jebeni drag and drop", listdata)
	return (
		<>
			<h1 className="header">
                React drag and drop list
			</h1>
			<DraggableList
				data={listData}
				renderItemContent={(item) => LessonCard(item)}
			/>
		</>
	)
}

const LessonCard = item => <Card item={item}/>

export default DragMain
