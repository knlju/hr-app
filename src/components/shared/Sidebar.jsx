import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation  } from "react-router-dom"
import "../../styles/CustomStyles.css"
import sidebarNav from "./SidebarNav"
import { Logout } from "./Logout"
import { useQuery } from "react-query"
import api from "../../api"

const Sidebar = () => {
	// const {data} = useQuery("allCompanies", api.getOurCompany)

	// const [companyName] = useState(data.data.data.attributes.name)

	const [activeIndex, setActiveIndex] = useState(0)
	const location = useLocation()
	const user = useSelector(defaultState => defaultState.user)

	useEffect(() => {
		const curPath = window.location.pathname.split("/")[1]
		const activeItem = sidebarNav.findIndex(item => item.section === curPath)

		setActiveIndex(curPath.length === 0 ? 0 : activeItem)
	}, [location])

	const closeSidebar = () => {
		document.querySelector(".main__content").style.transform = "scale(1) translateX(0)"
		setTimeout(() => {
			document.body.classList.remove("sidebar-open")
			document.querySelector(".main__content").style = ""
		}, 500)
	}
	return (
		<>
			{/* <div>
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
			</div> */}

			{/* <!-- Side bar--> */}
			{/* <div id="sidebar" className="h-screen w-16 menu bg-white text-white px-4 flex items-center nunito fixed shadow">
				<ul className="list-reset ">
					<li className="my-2 md:my-0">
						<Link to="/pending" className="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
							<i className="fas fa-user-clock fa-fw mr-3"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Pending</span>
						</Link>
					</li>
					<li className="my-2 md:my-0 ">
						<Link to="/team" className="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
							<i className="fas fa-users fa-fw mr-3"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Team</span>
						</Link>
					</li>
					<li className="my-2 md:my-0">
						<Link to="/questions" className="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
							<i className="fas fa-question-circle fa-fw mr-3"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Questions</span>
						</Link>
					</li>
					<li className="my-2 md:my-0">
						<Link to="/company" className="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
							<i className="fas fa-building fa-fw mr-3"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">Company</span>
						</Link>
					</li>
					<li className="my-2 md:my-0">
						<Link to="/myprofile" className="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400 items-center" >
							<i className="fa fa-id-card fa-fw mr-3"></i><span className="w-full inline-block pb-1 md:pb-0 text-sm">My Profile</span>
						</Link>
					</li>
				</ul>

			</div> */}


			{/* novi sidebar */}
			<div className='sidebar'>
				<div className="sidebar__logo">
					<div>
						<img src="https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
						{/* <p>{companyName}</p> */}
					</div>
					<div className="sidebar-close" onClick={closeSidebar}>
						<i className="fas fa-times"></i>
					</div>
				</div>
				<div className="sidebar__menu">
					{
						sidebarNav.map((nav, index) => (
							<Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && "active"}`} onClick={closeSidebar}>
								<div className="sidebar__menu__item__icon">
									{nav.icon}
								</div>
								<div className="sidebar__menu__item__txt">
									{nav.text}
								</div>
							</Link>
						))
					}
					<div className="sidebar__menu__item">
						{/* <div className="sidebar__menu__item__icon">
							<i className="fas fa-sign-out-alt"></i>
						</div>
						<div className="sidebar__menu__item__txt">
                        Logout
						</div> */}
						{user.isLoggedIn ? 
							<div className="flex justify-between items-center gap-1">
								<div className="flex align-center justify-start text-sm">
									<div className="flex items-center focus:outline-none">
										<img className="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User"/>
									</div>
									<div className="flex-col">
										<p>User name</p>
										<p>Company name</p>
									</div>
								</div>
								<div className="sidebar__menu__item__logout ml-3">
									<Logout />
								</div>
							</div> : <div className="flex-col gap-1">
								<Link className="sidebar__menu__item" onClick={closeSidebar} to="/login">Login</Link>
								<Link className="sidebar__menu__item" onClick={closeSidebar} to="/register">Register</Link>
							</div>
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar