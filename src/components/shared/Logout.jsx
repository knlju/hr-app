import React from "react"
import { useDispatch } from "react-redux"
import { logoutSuccess } from "../../actions/actions"

export const Logout = () => {
	const dispatch = useDispatch()

	const handleLogout = (e) => {
		e.preventDefault()

		dispatch(logoutSuccess())
	}
	return (
		<>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}
