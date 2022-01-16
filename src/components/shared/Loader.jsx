import React from "react"

// TODO: Ceo CSS da se izmeni
function Loader() {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-black opacity-70">
			<div className="flex items-center justify-center space-x-2 animate-pulse">
				<div className="w-8 h-8 bg-blue-400 rounded-full"/>
				<div className="w-8 h-8 bg-blue-400 rounded-full"/>
				<div className="w-8 h-8 bg-blue-400 rounded-full"/>
			</div>
		</div>
	)
}

export default Loader