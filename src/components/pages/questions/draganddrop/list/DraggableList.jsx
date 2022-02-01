import React, { useState } from "react"
import PropTypes from "prop-types"

import "./draggable-list.css"

import DraggableListItem from "./DraggableListItem"
import { useEffect } from "react"
import { useMutation } from "react-query"
import api from "../../../../../api"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

const DraggableList = props => {

	const companyID = useSelector(defaultState => defaultState.user.profile.attributes.company.data.id)
	const [questionName, setQuestionName] = useState("")
	const [questionType, setQuestionType] = useState("text")
	const [questionOrder, setQuestionOrder] = useState("")







	const [data, setdata] = useState(props.data)

	useEffect(()=>{
		setdata(props.data)
	}, [props.data])
    

	const [dragStartIndex, setdragStartIndex] = useState(null)

	// get index of draged item
	const onDragStart = (index) => setdragStartIndex(index)

	// update list when item dropped
	const onDrop = (dropIndex) => {
		// get draged item
		const dragItem = data[dragStartIndex]



		// delete draged item in list
		let list = [...data]
		if(dragStartIndex - dropIndex > 0) {
			const tmp = list[dragStartIndex].attributes.order
			list[dragStartIndex].attributes.order = list[dropIndex].attributes.order
			for(let i=dropIndex + 1; i<dragStartIndex; i++) {
				list[i].attributes.order = list[i + 1].attributes.order
			}
			// list[dropIndex].attributes.order
		}

		list.splice(dragStartIndex, 1)



		// update list
		if (dragStartIndex < dropIndex) {
			setdata([
				...list.slice(0, dropIndex - 1),
				dragItem,
				...list.slice(dropIndex - 1, list.length)
			])
		} else {
			setdata([
				...list.slice(0, dropIndex),
				dragItem,
				...list.slice(dropIndex, list.length)
			])
		}
	}

	/////pokusaj ubacivanja nove liste pitanja
	console.log("pitanja iz dragable liste", data)

	

	// useEffect(() => {
	// 	const arr = data
	// 	arr.forEach(question => {
	// 		setQuestionName(question.attributes.text)
	// 		setQuestionType(question.attributes.type)
	// 		setQuestionOrder(question.attributes.order)
			
	// 	})
	// }, [data])
	

	console.log("lllllllllllllLLLLLLL", questionOrder)

	const {
		mutate
	} = useMutation((payload)=>{ 
		api.postNewQuestionsOrder(payload)
	})

	const handleNewOrder = (e)=> {
		e.preventDefault()
		data.forEach(question =>{
			mutate({id: question.id, order: question.attributes.order})
		})
	}

	return (
		<>
			<ul className="draggable-list">
				{
					data.map((item, index) => {
						let key = index
						if (item.id) {
							key = item.id
						}
						return (
							<DraggableListItem
								key={key}
								index={index}
								onDragStart={(index) => onDragStart(index)}
								onDrop={(index) => onDrop(index)}
							>
								{
									props.renderItemContent(item)
								}
                        
							</DraggableListItem>
						)
					})
				}
			
				<DraggableListItem
					key={data.length}
					index={data.length}
					draggale={false}
					onDrop={(index) => onDrop(index)}
				/>
			</ul>
			<button type="submit"
				className="w-1/5 text-white inline-block bg-violet-800 hover:bg-violet-600 mb-5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={handleNewOrder}>Save new order
			</button>
		</>
	)
}

DraggableList.propTypes = {
	data: PropTypes.array,
	renderItemContent: PropTypes.func
}

export default DraggableList
