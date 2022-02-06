import React, {useEffect, useState} from "react"
import {useGetAllCompanies, useGetAllFilteredProfilesQuery} from "../../hooks"
import Loader from "../shared/Loader"
import UserCard from "../shared/UserCard"
import UserModal from "../UserModal"
import InputPair from "../shared/InputPair"
import {INPUT_TYPES, ORDER, SORT} from "../../constants"
import useDebounce from "../../hooks/useDebounce"

function CompanyWall() {

	const [modalUser, setModalUser] = useState(null)
	const [page, setPage] = useState(1)
	const [selectedCompany, setSelectedCompany] = useState(7)
	const [order, setOrder] = useState("desc")
	const [searchName, setSearchName] = useState("")
	const searchNameDebounced = useDebounce(searchName, 500)
	const [sort, setSort] = useState("createdAt")

	const {
		data: users, isLoading: usersLoading, isError: usersError, isPreviousData, isFetching
	} = useGetAllFilteredProfilesQuery({
		page: page,
		company: selectedCompany,
		sort,
		order,
		name: searchNameDebounced
	},
	{
		keepPreviousData: true,
	})

	const {
		data: companies
	} = useGetAllCompanies()

	if (usersLoading) {
		return <Loader/>
	}

	if (usersError) {
		return <p>Loading error...</p>
	}

	return (
		<>
			<div>
				<div>
					<InputPair
						question="Select a company"
						answer={selectedCompany}
						setAnswer={e => setSelectedCompany(e.target.value)}
						selectOptions={companies?.data?.data}
						type={INPUT_TYPES.select}/>
				</div>
				<div>
					<InputPair
						question="Sort by"
						answer={sort}
						setAnswer={e => setSort(e.target.value)}
						selectOptions={SORT}
						type={INPUT_TYPES.select}/>
				</div>
				<div>
					<InputPair
						question="Order"
						answer={order}
						setAnswer={e => setOrder(e.target.value)}
						selectOptions={ORDER}
						type={INPUT_TYPES.select}/>
				</div>
				<div>
					<InputPair
						question="Search by name"
						answer={searchName}
						setAnswer={e => setSearchName(e.target.value)}
						type={INPUT_TYPES.text}/>
				</div>
			</div>
			{modalUser && <UserModal user={modalUser} closeModal={() => setModalUser(null)}/>}
			<div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
				{
					users?.data?.data?.map(user => (
						<div key={user.id} className="cursor-pointer" onClick={() => setModalUser(user)}>
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