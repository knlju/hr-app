import React from "react"
import {formatDate} from "../../utils"
import PropTypes from "prop-types"

function UserCard({user, openDeleteModal, mainAction, actionName, noActions = false}) {
	return (
		<div key={user.id}
			className="p-4 h-[350px] sm:h-fit 2xl:h-[400px] 2xl:max-w-[380px] rounded-md shadow-md bg-white dark:bg-gray-900 overflow-hidden text-gray-900 dark:text-white">
			<div className="">
				{
					user?.attributes?.profilePhoto?.data?.attributes?.url ?
						<img className="w-full h-48 object-cover rounded-md shadow-md"
							src={user?.attributes?.profilePhoto?.data?.attributes?.url}
							alt="Sunset in the mountains"/>
						:
						<div className="w-full h-48 flex justify-center items-center rounded-md shadow-md">No Profile
                            Picture</div>
				}
				<div className="">
					<div className="text-base md:text-lg font-bold mb-2 mt-4">{user.attributes.name}</div>
					<p className="text-xs md:text-sm text-gray-300 font-semibold">
                        Joined {formatDate(user.attributes.createdAt)}
					</p>
				</div>
			</div>
			{
				!noActions && (
					<div className="flex justify-between mt-4 items-center">
						<div>
							<button
								className="text-base bg-orange-600 hover:bg-orange-500 text-gray-100 py-2 px-4 disabled:opacity-50 rounded tracking-wide w-20"
								onClick={e => mainAction(e, user.id)}>
								{actionName}
							</button>
						</div>
						<div>
							<button
								className="text-base bg-red-600 hover:bg-red-500 text-gray-100 py-2 px-4 rounded tracking-wide w-20"
								onClick={e => openDeleteModal(e, user)}>
                                Delete
							</button>
						</div>
					</div>
				)
			}
		</div>
	)
}

UserCard.propTypes = {
	user: PropTypes.object,
	openDeleteModal: PropTypes.func,
	mainAction: PropTypes.func,
	actionName: PropTypes.string,
	noActions: PropTypes.bool,
}

export default UserCard