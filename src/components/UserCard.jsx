// import React from "react"
//
// function UserCard({id, openUserModal, profilePhoto}) {
// 	return (
// 		<div key={user.id}
// 			 className="basis-1/3 grow-0 rounded-lg overflow-hidden shadow-lg text-violet-800 cursor-pointer"
// 			 onClick={openUserModal}
// 		>
// 			<div className="px-6 py-4">
// 				<img className="w-full" src={user?.profilePhoto?.data.attributes.formats.medium}
// 					 alt="Sunset in the mountains"/>
// 				<div className="font-bold text-xl mb-2">{user.attributes.name}</div>
// 				<p className="text-gray-700 text-base">
// 					Joined {user.attributes.createdAt}
// 				</p>
// 			</div>
// 			<div className="flex justify-between px-6 pt-4 pb-2">
// 				<div>
// 					<button onClick={e => openEditPage(e, user.id)}>Edit</button>
// 				</div>
// 				<div>
// 					<button onClick={deleteUser}>Delete</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
//
// export default UserCard