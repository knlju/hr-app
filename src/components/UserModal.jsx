import React from "react"
import Modal from "./shared/Modal"
import PropTypes from "prop-types"
import {useAnswersQuery} from "../hooks"
import SpinnerLoader from "./shared/SpinnerLoader"

function UserModal({user, closeModal}) {

	const {data: answers, isLoading, isError} = useAnswersQuery(user.id)

	console.log({answers})

	return (
		<Modal closeModal={closeModal}>
			<div className="">
				<div className="float-right cursor-pointer pr-3" onClick={closeModal}>
					x
				</div>
				<div>
					<img src={user.attributes?.profilePhoto?.data?.attributes.url} alt=""/>
				</div>
				<div className="flex">
					<div className="p-3">
						{user.attributes.name}
					</div>
				</div>
				<div>
					{isLoading && (
						<div>
							Loading answers
							<SpinnerLoader />
						</div>
					)}
					{
						answers?.data?.data?.map(answer => {
							if (!answer.attributes?.question?.data) return null
							return (
								<>
									<div>
										<div>{answer?.attributes?.question?.data?.attributes?.text}</div>
										<div>
											{
												answer?.attributes?.question?.data?.attributes?.type === "image" ? (
													<div>
														<img src={answer?.attributes?.answer} alt=""/>
													</div>
												) : (
													<div>
														<p>{answer?.attributes?.answer}</p>
													</div>
												)
											}
										</div>
									</div>
								</>)
						})
					}
				</div>
			</div>
		</Modal>
	)
}

UserModal.propTypes = {
	user: PropTypes.object,
	closeModal: PropTypes.func,
}

export default UserModal