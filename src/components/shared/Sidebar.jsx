import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation  } from "react-router-dom"
import "../../styles/CustomStyles.css"
import sidebarNav from "./SidebarNav"
import { Logout } from "./Logout"
import { useQuery } from "react-query"
import api from "../../api"
import jwtDecode from "jwt-decode"
import Loader from "../shared/Loader"
import ToggleTheme from "./ToggleTheme"

const Sidebar = () => {

	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)
	const user = useSelector(defaultState => defaultState.user)

	const [userName, setUserName] = useState("")
	const [companyName, setCompanyName] = useState("")
	const [userProfilePhoto, setUserProfilePhoto] = useState(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const location = useLocation()

	const {data} = useQuery("getMyProfile", async ()=>{
		if (isLoggedIn) {
			const token = await localStorage.getItem("token")
			if (token) {
				const tokenDecoded = jwtDecode(token)
				const userId = tokenDecoded.id
				return api.getProfileByID(userId)
			}
			return false
		}
		return false
	})

	
	useEffect(() => {
		if (isLoggedIn) {
			if(data && data.data && data.data.data[0] && data.data.data[0].id) {
				setUserName(data.data.data[0].attributes.name)
				setCompanyName(data.data.data[0].attributes?.company?.data?.attributes.name)
				setUserProfilePhoto(data.data.data[0].attributes.profilePhoto.data?.attributes.formats.thumbnail.url)
			}
		}
	}, [data])


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

	// if(!data) {
	// 	return <Loader/>
	// }
	return (
		<>
			{/* novi sidebar */}
			<div className='sidebar'>
				<div className="sidebar__logo">
					<div>
						<p className="text-xl font-medium text-white">.teamHUB</p>
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
					<div className="sidebar__menu__item flex-col items-start">
						<ToggleTheme />
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
										<img className="w-8 h-8 rounded-full mr-4" src={userProfilePhoto} alt={userName}/>
									</div>
									<div className="flex-col">
										<p>{userName}</p>
										<p>{companyName}</p>
									</div>
								</div>
								<div className="sidebar__menu__item__logout ml-3">
									<Logout />
								</div>
							</div> : <div className="flex-col gap-1">
								<Link className="sidebar__menu__item" onClick={closeSidebar} to="/login"><i className="fas fa-user-lock"></i>Login</Link>
								<Link className="sidebar__menu__item" onClick={closeSidebar} to="/register"><i className="fas fa-sign-in-alt"></i>Register</Link>
							</div>
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar