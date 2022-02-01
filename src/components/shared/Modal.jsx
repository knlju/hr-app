import React, {useEffect} from "react"
import ReactDOM from "react-dom"

function Modal({children, closeModal}) {

	useEffect(() => {
		document.body.style.overflow = "hidden"
		return () => document.body.style.overflow = "auto"
	}, [])

	return ReactDOM.createPortal(
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
			aria-modal="true" onClick={closeModal}>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"/>
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true">&#8203;</span>
					{React.Children.map(children, child => React.cloneElement(child, {onClick: e => e.stopPropagation()}))}
				</div>
			</div>
		</div>,
		document.getElementById("portal")
	)
}

export default Modal