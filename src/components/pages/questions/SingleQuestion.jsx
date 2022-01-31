import React, { useState } from "react"
import PropTypes from "prop-types"
import { useNavigate } from "react-router"
import api from "../../../api"
import DeleteUserModal from "../../shared/DeleteUserModal"

const SingleQuestion = (props) => {
	const navigate = useNavigate()
	const [questionDeleteModal, setQuestionDeleteModal] = useState(false)
	
	// const {text} = question
	const question = props.question
	const id = question.id
	const type = question.attributes.type
	const order = question.attributes.order
	const text = question.attributes.text
	
	const handleEdit = (id) => {
		// <Link to={"/edit-question/123"}><button>EDIT QUESTION</button></Link>
		navigate(`/edit-question/${id}`)
	}

	const handleDelete = (id) => {
		api.deleteQuestion({id})
		navigate("/questions")
		setQuestionDeleteModal(false)
		if (typeof props.cbRefresh === "function") {
			props.cbRefresh()
		}
	}


	return (
		<>
			{questionDeleteModal &&<DeleteUserModal onCancel={() => setQuestionDeleteModal(false)} modeQuestion={true}onConfirm={()=>{handleDelete(id)}}
			/>}
			<div className="flex items-center justify-between w-full bg-white mb-3 rounded-lg shadow-lg text-violet-800 px-3 py-2">
				<div className="flex items-center gap-2 mr-1">
					<button className="flex mr-2">
						<i className="fas fa-bars cursor-pointer text-sm"></i>
					</button>
					<div>
						<p>{text}</p>
						{/* <p>redni broj{order}</p>
				<p>tip pitanja {type}</p> */}
					</div>
				</div>
			
				<div className="flex justify-between gap-1">
					{/* <div className="flex flex-col">
						<button>UP</button>
						<button>DOWN</button>
					</div> */}
					<div className="flex gap-2">
						<div className="flex items-center gap-2">
							<button onClick={() => {handleEdit(id)}}>
								<i className="far fa-edit hover:text-green-700 cursor-pointer"></i>
							</button>
							{/* <button onClick={() => {handleDelete(id)}}>
								<i className="far fa-trash-alt hover:text-red-700 cursor-pointer"></i>
							</button> */}
							<button onClick={() => {
								setQuestionDeleteModal(true)
							}}>
								<i className="far fa-trash-alt hover:text-red-700 cursor-pointer"></i>
							</button>
						</div>
						<div className="flex items-center">
							<button onClick={() => {
								props.setModalOpen(id)
							}}>
								<i className="far fa-eye hover:text-black cursor-pointer"></i>
							</button>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}

export default SingleQuestion

SingleQuestion.propTypes = {
	question: PropTypes.object,
	cbRefresh: PropTypes.func,
	setModalOpen: PropTypes.func,
	setQuestionDeleteModal: PropTypes.func
}
