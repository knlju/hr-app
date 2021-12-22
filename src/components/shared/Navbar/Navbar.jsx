import React from "react"
import {Link} from "react-router-dom"
import ToggleTheme from "../ToggleTheme"

const Navbar = () => {
	return (
		<div>
			<h1>Navbar</h1>
			<Link to="/login">Login</Link>
			<Link to="/register">Register</Link>
			<Link to="/">Home</Link>
			<ToggleTheme />
		</div>
	)
}

export default Navbar
