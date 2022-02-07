import createRoutes from "./routes"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {loginWithTokenStart} from "./redux/actions/actions"

const routes = createRoutes()

function App() {

	const dispatch = useDispatch()

	useEffect(() => {
		// init
		let token = localStorage.getItem("token")
		if (token) {
			dispatch(loginWithTokenStart(token))
		}
	})

	return (
		<>
			{routes}
		</>
	)
}

export default App
