import Navbar from "./components/shared/Navbar"
import createRoutes from "./routes"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {loginSuccess} from "./redux/actions/actions"


const routes = createRoutes()

function App() {

	const dispatch = useDispatch()

	useEffect(() => {
		if(localStorage.getItem("token")) {
			dispatch(loginSuccess("user"))
		}
	})

	return (
		<>
			{/* <Navbar/> */}
			{routes}
		</>
	)
}

export default App
