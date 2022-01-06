import React from "react"
import { useDispatch } from "react-redux"
import {logoutStart} from "../../actions/actions"

export const Logout = () => {
	const dispatch = useDispatch()

	const handleLogout = (e) => {
		e.preventDefault()

		dispatch(logoutStart())
	}
	return (
		<>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}
