import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import {useNavigate} from "react-router"
import api from "../../../api"
import DeleteUserModal from "../../shared/DeleteUserModal"
import {useSelector} from "react-redux"
import "../../../styles/CustomStyles.css"
import {useDeleteQuestionMutation, useDeleteUserAnswerMutation} from "../../../hooks"
import {useQueryClient} from "react-query"
import Alert from "../../shared/Alert"

const SingleQuestion = (props) => {

	const queryClient = useQueryClient()

	const navigate = useNavigate()
	const isAdmin = useSelector(defaultState => defaultState.user.profile.attributes.userRole)
	const [admin, setAdmin] = useState("")

	useEffect(() => {
		if (isAdmin === "company_admin") {
			setAdmin(isAdmin)
		}
	}, [])

	const [questionDeleteModal, setQuestionDeleteModal] = useState(false)

	const {mutateAsync: deleteAnswerAsync} = useDeleteUserAnswerMutation()
	const {mutateAsync: deleteQuestionAsync} = useDeleteQuestionMutation({
		onSuccess: deletedQuestion => {
			deletedQuestion?.data?.data.attributes?.answers?.data?.forEach(async answer => {
				return await deleteAnswerAsync(answer.id)
			})
			queryClient.invalidateQueries("getQuestions")
		}
	})

	const question = props.question
	const id = question.id
	const text = question.attributes.text

	const handleEdit = (id) => {
		navigate(`/edit-question/${id}`)
	}

	const [alert, setAlert] = useState({show: false})
	const handleAlert = ({type, text}) => {
		setAlert({show: true, type, text})
		setTimeout(() => {
			setAlert({show: false})
		}, 3000)
	}

	const handleDelete = async (id) => {
		await deleteQuestionAsync(id)
		handleAlert({type: "danger", text: "Question deleted successfully!"})
		setQuestionDeleteModal(false)
	}

	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text}/>}
			{questionDeleteModal &&
                <DeleteUserModal onCancel={() => setQuestionDeleteModal(false)} modeQuestion={true} onConfirm={() => {handleDelete(id)}}
                />}
			<div
				className="flex items-center justify-between w-full bg-white rounded-lg shadow-lg text-gray-900 px-4 py-4 dark:bg-gray-900 dark:text-white">
				<div className="flex items-center gap-2 mr-1">
					<button className="flex mr-2">
						<i className="fas fa-bars cursor-pointer text-sm"/>
					</button>
					<div>
						<p>{text}</p>
					</div>
				</div>

				<div className="flex justify-between gap-2">
					<div className="flex gap-2">
						{admin && <div className="flex items-center gap-2">
							<button className="tooltip" onClick={() => {
								handleEdit(id)
							}}>
								<i className="far fa-edit hover:text-green-700 cursor-pointer"/>
								<span className="tooltiptext">edit</span>
							</button>
							<button className="tooltip" onClick={() => {
								setQuestionDeleteModal(true)
							}}>
								<i className="far fa-trash-alt hover:text-red-700 cursor-pointer"/>
								<span className="tooltiptext">delete</span>
							</button>
						</div>}

						<div className="flex items-center">
							<button className="tooltip" onClick={() => {
								props.setModalOpen(id)
							}}>
								<i className="far fa-eye hover:text-cyan-800 cursor-pointer"/>
								<span className="tooltiptext">answer</span>
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
	setQuestionDeleteModal: PropTypes.func,
}
