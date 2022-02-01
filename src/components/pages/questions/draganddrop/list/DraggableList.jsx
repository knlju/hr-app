import React, {useState} from "react"
import PropTypes from "prop-types"

import "./draggable-list.css"

import DraggableListItem from "./DraggableListItem"
import {useEffect} from "react"
import {useMutation} from "react-query"
import api from "../../../../../api"
import {useSelector} from "react-redux"
import {useParams} from "react-router"
import Loader from "../../../../shared/Loader"
import SpinnerLoader from "../../../../shared/SpinnerLoader"

const DraggableList = props => {

	const [questionList, setquestionList] = useState(props.data)

	const [dragStartIndex, setdragStartIndex] = useState(null)

	// get index of draged item
	const onDragStart = (index) => setdragStartIndex(index)

	// update list when item dropped
	const onDrop = (dropIndex) => {
		// get draged item
		const dragItem = questionList[dragStartIndex]

		// update order in the list
		let list = [...questionList]
		if (dragStartIndex > dropIndex) {
			const tmp = list[dropIndex].attributes.order
			for (let i = dropIndex; i < dragStartIndex; i++) {
				list[i].attributes.order = list[i + 1].attributes.order
			}
			list[dragStartIndex].attributes.order = tmp
		} else {
			const tmp = list[dropIndex - 1].attributes.order
			for (let i = dropIndex - 1; i > dragStartIndex; i--) {
				list[i].attributes.order = list[i - 1].attributes.order
			}
			list[dragStartIndex].attributes.order = tmp
		}

		// update list
		list.splice(dragStartIndex, 1)
		if (dragStartIndex < dropIndex) {
			setquestionList([
				...list.slice(0, dropIndex - 1),
				dragItem,
				...list.slice(dropIndex - 1, list.length)
			])
		} else {
			setquestionList([
				...list.slice(0, dropIndex),
				dragItem,
				...list.slice(dropIndex, list.length)
			])
		}
	}

	console.log("pitanja iz dragable liste", questionList)

	const {
		mutateAsync,
		isLoading: isUpdatingQuestionOrder,
	} = useMutation((payload) => {
		api.putNewQuestionsOrder(payload)
	})

	const handleNewOrder = async (e) => {
		e.preventDefault()

		for (let i = 0; i <questionList.length; i++) {
			// delete old order
			await mutateAsync({id: questionList[i].id, order: (i + 20)})
			// put new order
			await mutateAsync({id: questionList[i].id, order: questionList[i].attributes.order})
		}
		alert("done!")
	}

	return (
		<>
			{isUpdatingQuestionOrder && <SpinnerLoader/>}
			<ul className="draggable-list">
				{
					questionList.map((item, index) => {
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
					key={questionList.length}
					index={questionList.length}
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
