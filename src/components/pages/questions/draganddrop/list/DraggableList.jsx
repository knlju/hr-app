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

const DraggableList = ({renderItemContent, questionList, setQuestionList}) => {

	const [alert, setAlert] = useState({show: false})

	// get index of draged item
	const [dragStartIndex, setDragStartIndex] = useState(null)

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
	const {
		mutateAsync,
		isLoading: isUpdatingQuestionOrder,
	} = useMutation(async (payload) => {
		return await api.putNewQuestionsOrder(payload)
	})
	const handleAlert = ({type, text}) => {
		setAlert({show: true, type, text})
		setTimeout(() => {
			setAlert({show: false})
		}, 3000)
	}

	const handleNewOrder = async (e) => {
		e.preventDefault()

		for (let i = 0; i < questionList.length; i++) {
			// delete old order
			await mutateAsync({id: questionList[i].id, order: -(i + 40)})
		}

		for (let i = 0; i < questionList.length; i++) {
			// put new order
			await mutateAsync({id: questionList[i].id, order: questionList[i].attributes.order})
		}

		handleAlert({type: "success", text: "Order updated successfully!"})
	}

	return (
		<>
			{isUpdatingQuestionOrder && <Loader/>}

			{alert.show && <Alert type={alert.type} text={alert.text}/>}
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
									renderItemContent(item)
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
				className="w-1/5 bg-white hover:bg-gray-200 shadow-xl inline-block dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white mb-5 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				onClick={handleNewOrder}>Save new order
			</button>
		</>
	)
}

DraggableList.propTypes = {
	renderItemContent: PropTypes.func,
	questionList: PropTypes.any,
	setQuestionList: PropTypes.any
}

export default DraggableList
