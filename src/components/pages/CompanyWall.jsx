import React, {useState} from "react"
import {useGetAllProfilesQuery, usePublishedTeamMemberProfiles} from "../../hooks"
import Loader from "../shared/Loader"
import UserCard from "../shared/UserCard"
import UserModal from "../UserModal"

function CompanyWall(props) {

	const [modalUser, setModalUser] = useState(null)
	const [page, setPage] = useState(1)

	const {
		data: users, isLoading: usersLoading, isError: usersError, isPreviousData, isFetching
	} = useGetAllProfilesQuery(page, { keepPreviousData : true })

	if (usersLoading) {
		return <Loader/>
	}

	if (usersError) {
		return <p>Loading error...</p>
	}

	return (
		<>
			{modalUser && <UserModal user={modalUser} closeModal={() => setModalUser(null)}/>}
			<div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
				{
					users.data.data.map(user => (
						<div key={user.id} onClick={() => setModalUser(user)}>
							<UserCard user={user} noActions/>
						</div>
					))
				}
			</div>
			<div>
				<span>Current Page: {page}</span>
				<button
					className="bg-transparent hover:bg-violet-500 text-violet-800 font-semibold hover:text-white py-2 px-4 border border-violet-500 disabled:opacity-50 hover:border-transparent rounded"
					onClick={() => setPage(old => Math.max(old - 1, 0))}
					disabled={page === 1}
				>
                    Previous Page
				</button>
				<button
					className="bg-transparent hover:bg-violet-500 text-violet-800 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent disabled:opacity-50 rounded"
					onClick={() => {
						if (!isPreviousData && (users?.data?.meta?.pagination?.pageCount > page)) {
							setPage(old => old + 1)
						}
					}}
					// Disable the Next Page button until we know a next page is available
					disabled={isPreviousData || (users?.data?.meta?.pagination?.pageCount <= page)}
				>
                    Next Page
				</button>
				{isFetching ? <span> Loading...</span> : null}
			</div>
		</>
	)
}

export default CompanyWall