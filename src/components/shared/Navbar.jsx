import React from "react"
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { Logout } from "./Logout"
import ToggleTheme from "./ToggleTheme"

const Navbar = () => {
	const user = useSelector(defaultState => defaultState.user)
	return (
		<div className="flex justify-between items-center mx-auto max-w-screen-lg p-2 bg-gray-600 text-white">
			<h1>Navbar</h1>
			<div className="flex justify-between items-center gap-3">
				{user.isLoggedIn ? 
					<div>
						<Logout/>
					</div>
					: 
					<div className="flex justify-between items-center gap-3">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>}
				<ToggleTheme />
			</div>
		</div>
	)
}

export default Navbar
