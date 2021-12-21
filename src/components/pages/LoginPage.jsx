import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {loginUser} from "../../actions/actionCreators"

const LoginPage = () => {

	const user = useSelector(defaultState => defaultState.user)
	const state = useSelector(defaultState => defaultState)
	const dispatch = useDispatch()

	useEffect(() => console.log("user", user), [user])
	useEffect(() => console.log("state", state), [state])

	const handleFakeLogin = () => {
		dispatch(loginUser("test"))
	}

	return (
		<div>
			<h1>Login</h1>
			<button onClick={handleFakeLogin}>
				<h1>
                    Fake log in
				</h1>
			</button>
			<h1>{JSON.stringify(user)}</h1>
		</div>
	)
}

export default LoginPage
