import { useState } from "react"
// import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"




const ProtectedRoutes = () => {
	// const user = useSelector(defaultState => defaultState.user)

	const [isAdmin] = useState(true)

	return (
		// user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />
		isAdmin ? <Outlet /> : <Navigate to="/" />
	)
}

export default ProtectedRoutes