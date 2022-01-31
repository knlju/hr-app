import React, {useState} from "react"
import Modal from "./shared/Modal"
import InputPair from "./shared/InputPair"
import PropTypes from "prop-types"
import {useInviteMutation} from "../hooks"

function InviteModal({closeModal, companySlug}) {

	const [email, setEmail] = useState("")

	const {mutate, isLoading, isError} = useInviteMutation()

	function handleSubmit (e) {
		e.preventDefault()
		mutate({email, companySlug})
		closeModal()
	}

	return (
		<Modal closeModal={closeModal}>
			<div
				className="inline-block align-bottom bg-white rounded-lg
				text-left overflow-hidden shadow-xl transform transition-all
				sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
				{isLoading && <p>Loading</p>}
				{isError && <p>Error</p>}
				<form onSubmit={handleSubmit}>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Invite
							</h3>
							<div className="mt-2">
								<InputPair question="email" answer={email} setAnswer={e => setEmail(e.target.value)} type="text" />
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button type="submit"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Invite
						</button>
						<button type="button"
							className="mt-3 disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={closeModal}>
                            Cancel
						</button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

InviteModal.propTypes = {
	closeModal:PropTypes.func,
	companySlug: PropTypes.string
}

export default InviteModal