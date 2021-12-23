import React from "react"
import {Link} from "react-router-dom"
import ToggleTheme from "../ToggleTheme"

const Navbar = () => {
	return (
		<div className="flex justify-between items-center mx-auto max-w-screen-lg p-2 bg-gray-600 text-white">
			<h1>Navbar</h1>
			<div className="flex justify-between items-center gap-3">
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/">Home</Link>
				<ToggleTheme />
			</div>
		</div>
	)
}

export default Navbar
