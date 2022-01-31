import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import {logoutStart} from "../../redux/actions/actions"

export const Logout = () => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn)
	const dispatch = useDispatch()

	const handleLogout = (e) => {
		e.preventDefault()
		dispatch(logoutStart())
	}

	// TODO: da li je redirect iz shared componente anti-pattern?
	if(!isLoggedIn) {
		return <Navigate to="/login" />
	}

	return (
		<>
			<button onClick={handleLogout}>
				<i className="fas fa-sign-out-alt"></i>
			</button>
		</>
	)
}
