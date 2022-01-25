import React, {useEffect} from "react"
import {useQuery} from "react-query"
import api from "../../api"
import Loader from "../shared/Loader"
import {useNavigate} from "react-router"

export const TeamPage = () => {
	const {data, isLoading, isError} = useQuery("getPublishedTeamMemberProfiles", api.getPublishedTeamMemberProfiles)
	const navigate = useNavigate()

	function openUserModal() {
		alert("Open modal")
	}

	function openEditPage(e, userId) {
		e.stopPropagation()
		navigate(`/user/${userId}/edit`)
	}

	function deleteUser(e, userId) {
		e.stopPropagation()
		alert("delete")
	}

	if (isLoading) {
		return (
			<Loader/>
		)
	}

	if (isError) {
		return (
			<h1>
                Loading error...
			</h1>
		)
	}

	console.log({data})
	console.log("data.data.data:", data.data.data)

	return (
		<div className="flex flex-wrap">
			{
				data.data.data.map(user => (
					<div key={user.id}
						className="basis-1/3 grow-0 rounded-lg overflow-hidden shadow-lg text-violet-800 cursor-pointer"
						onClick={openUserModal}
					>
						<div className="px-6 py-4">
							<img className="w-full" src={user?.profilePhoto?.data.attributes.formats.medium}
								alt="Sunset in the mountains"/>
							<div className="font-bold text-xl mb-2">{user.attributes.name}</div>
							<p className="text-gray-700 text-base">
                                    Joined {user.attributes.createdAt}
							</p>
						</div>
						<div className="flex justify-between px-6 pt-4 pb-2">
							<div>
								<button onClick={e => openEditPage(e, user.id)}>Edit</button>
							</div>
							<div>
								<button onClick={e => deleteUser(e, user.id)}>Delete</button>
							</div>
						</div>
					</div>
				)
				)
			}
		</div>
	)
}
