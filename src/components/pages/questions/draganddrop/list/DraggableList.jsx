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
import Alert from "../../../../shared/Alert"

const DraggableList = props => {

	const [questionList, setQuestionList] = useState(props.data)

	const [dragStartIndex, setDragStartIndex] = useState(null)
	const [movedQuestions, setMovedQuestions] = useState()

	// get index of draged item
	const onDragStart = (index) => setDragStartIndex(index)

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
		//
		// const dragRange = {
		// 	from: Math.min(dragStartIndex, dropIndex),
		// 	to: Math.max(dragStartIndex, dropIndex),
		// }
		// setMovedQuestions(list.filter((question, i) => i > dragRange.from))

		// update list
		list.splice(dragStartIndex, 1)
		if (dragStartIndex < dropIndex) {
			setQuestionList([
				...list.slice(0, dropIndex - 1),
				dragItem,
				...list.slice(dropIndex - 1, list.length)
			])
		} else {
			setQuestionList([
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
	} = useMutation(async (payload) => {
		return await api.putNewQuestionsOrder(payload)
	})
	const [alert, setAlert] = useState({ show: false })
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text })
		setTimeout(() => {
			setAlert({ show: false })
		}, 3000)
	}

	const handleNewOrder = async (e) => {
		e.preventDefault()

		for (let i = 0; i <questionList.length; i++) {
			// delete old order
			await mutateAsync({id: questionList[i].id, order: -(i + 40)})
		}

		for (let i = 0; i < questionList.length; i++) {
			// put new order
			await mutateAsync({id: questionList[i].id, order: questionList[i].attributes.order})
		}

		// TODO prikazati notifikaciju umesto ovoga
		handleAlert({ type: "success", text: "Order updated successfully!" })
	}

	return (
		<>
			{isUpdatingQuestionOrder && <Loader/>}

			{alert.show && <Alert type={alert.type} text={alert.text} />}
			<ul className="draggable-list w-full">
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
				className="w-1/5 text-white inline-block bg-gray-900 hover:bg-gray-700 mb-5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
