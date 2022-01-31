import React from "react"
import {formatDate} from "../../utils"
import PropTypes from "prop-types"

function UserCard({user, openDeleteModal, mainAction, actionName}) {
	return (
		<div key={user.id}
			className="p-2 rounded-lg overflow-hidden shadow text-violet-800">
			<div className="p-2">
				{
					user?.attributes?.profilePhoto?.data?.attributes?.url ?
						<img className="w-full h-48 object-cover shadow"
							src={user?.attributes?.profilePhoto?.data?.attributes?.url}
							alt="Sunset in the mountains"/>
						:
						<div className="w-full h-48 flex justify-center items-center shadow">No Profile
                            Picture</div>
				}
				<div className="font-bold text-xl mb-2 mt-4">{user.attributes.name}</div>
				<p className="text-gray-700 text-base">
                    Joined {formatDate(user.attributes.createdAt)}
				</p>
			</div>
			<div className="flex justify-between p-2 pt-4 pb-2">
				<div>
					<button className="bg-transparent hover:bg-violet-500 text-violet-800 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
						onClick={e => mainAction(e, user.id)}>
						{actionName}
					</button>
				</div>
				<div>
					<button className="bg-transparent hover:bg-violet-500 text-violet-800 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
						onClick={e => openDeleteModal(e, user)}>
                        Delete
					</button>
				</div>
			</div>
		</div>
	)
}

UserCard.propTypes = {
	user: PropTypes.object,
	openDeleteModal: PropTypes.func,
	mainAction: PropTypes.func,
	actionName: PropTypes.string
}

export default UserCard