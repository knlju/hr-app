import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
	return (
		<div>
			<ul>
				<li>
					<Link to="/pending">Pending</Link>
				</li>
				<li>
					<Link to="/team">Team</Link>
				</li>
				<li>
					<Link to="/questions">Questions</Link>
				</li>
				<li>
					<Link to="/company">Company Info</Link>
				</li>
				<li>
					<Link to="/myprofile">My Profile</Link>
				</li>
			</ul>
		</div>
	)
}

export default Sidebar