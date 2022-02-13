import createRoutes from "./routes"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {loginWithTokenError, loginWithTokenStart} from "./redux/actions/actions"
// import { ReactQueryDevtools } from "react-query/devtools"

const routes = createRoutes()

function App() {

	const dispatch = useDispatch()

	useEffect(() => {
		// init
		let token = localStorage.getItem("token")
		if (token) {
			dispatch(loginWithTokenStart(token))
		} else {
			dispatch(loginWithTokenError())
		}
	})

	return (
		<>
			{routes}
			{/*<ReactQueryDevtools />*/}
		</>
	)
}

export default App
