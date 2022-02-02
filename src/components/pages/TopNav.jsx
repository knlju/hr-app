import jwtDecode from "jwt-decode"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import api from "../../api"

const TopNav = () => {
	const isLoggedIn = useSelector(defaultState => defaultState.user.isLoggedIn)

	const [userName, setUserName] = useState("")
	const [userProfilePhoto, setUserProfilePhoto] = useState(null)

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
				setUserProfilePhoto(data.data.data[0].attributes.profilePhoto.data?.attributes.formats.thumbnail.url)
			}
		}
	}, [data])




	const openSidebar = () => {
		document.body.classList.add("sidebar-open")
	}

	return (
		<div className='flex items-center justify-between mb-11'>
			<div className="flex items-center justify-start text-sm">
				<div className="flex items-center focus:outline-none">
					<img className="w-10 h-10 rounded-full mr-4" src={userProfilePhoto} alt={userName}/>
				</div>
				<div className="flex">
					<p className="text-violet-800 text-lg">{userName}</p>
				</div>
			</div>
			<div className="sidebar-toggle" onClick={openSidebar}>
				<i className="fas fa-bars"></i>
			</div>
		</div>
	)
}

export default TopNav