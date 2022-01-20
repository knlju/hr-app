import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import PropTypes from "prop-types"

/* TODO: another solution:
*   instead of props, you can add checking
*   of route types in ProtectedRoutes  */
export const RouteTypes = {
	adminOnly: "adminOnly",
	companyUser: "companyUser",
	loggedOutOnly: "loggedOutOnly"
}

const ProtectedRoutes = ({adminOnly = false, companyUser = false, loggedOutOnly = false}) => {
	const user = useSelector(defaultState => defaultState.user)

	if (adminOnly) {
		return user?.isAdmin ? <Outlet /> : <Navigate to="/401" />
	}

	if (companyUser) {
		return user ? <Outlet /> : <Navigate to="/401" />
	}

	// TODO: gde ono treba da se redirectuje posle logina
	if (loggedOutOnly) {
		return !user.isLoggedIn ? <Outlet /> : <Navigate to="/" />
	}

	return (
		user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />
	)
}

ProtectedRoutes.propTypes = {
	adminOnly: PropTypes.bool,
	companyUser: PropTypes.bool,
	loggedOutOnly: PropTypes.bool
}

export default ProtectedRoutes