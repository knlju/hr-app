import React from "react"
import Modal from "./Modal"

function Loader() {
	return (
		<Modal>
			<div className="fixed inset-0 flex justify-center items-center bg-black opacity-70 z-10">
				<div className="flex items-center justify-center space-x-2 animate-pulse">
					<div className="w-8 h-8 bg-blue-800 rounded-full"/>
					<div className="w-8 h-8 bg-blue-800 rounded-full"/>
					<div className="w-8 h-8 bg-blue-800 rounded-full"/>
				</div>
			</div>
		</Modal>
	)
}

export default Loader