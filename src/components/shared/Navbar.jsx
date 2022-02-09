import React, { useState } from "react"
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { Logout } from "./Logout"
import ToggleTheme from "./ToggleTheme"

const Navbar = () => {
	const user = useSelector(defaultState => defaultState.user)

	const [userDrop, setUserDrop] = useState(false)
	const handleUserOptions = () => {
		setUserDrop(!userDrop)
	}
	return (
		<div className="flex justify-between items-center mx-auto max-w-screen-lg p-2 bg-gray-600 text-white">
			<h1>Navbar</h1>
			<div className="flex justify-between items-center gap-3">
				{/* {user.isLoggedIn ? 
					<div>
						<Logout/>
					</div>
					: 
					<div className="flex justify-between items-center gap-3">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>} */}
				<ToggleTheme />

				{/* USER PHOTO */}
				{user.isLoggedIn ? 
					<div className="flex relative pr-6">
						<div className="relative text-sm">
							<button className="flex items-center focus:outline-none mr-3" onClick={handleUserOptions} >
								<img className="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"/> <span className="hidden md:inline-block">Hi, User </span>
							</button>
							{userDrop && <div className="bg-white nunito rounded shadow-md mt-2 absolute top-7 right-0 min-w-full overflow-auto z-5">
								<ul className="list-reset">
									<li><Link to="/profile" className="px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline">My account</Link></li>
									<li>
										<hr className="border-t mx-2 border-gray-400"/>
									</li>
									<li className="px-4 py-2 block text-gray-900 hover:bg-indigo-400 hover:text-white no-underline hover:no-underline">
										<Logout/>
									</li>
								</ul>
							</div>}
						</div>
					</div> : <div className="flex justify-between items-center gap-3">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>
				}
			</div>
		</div>
	)
}

export default Navbar
