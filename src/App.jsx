import Navbar from "./components/shared/Navbar"
import createRoutes from "./routes"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {loginError, loginSuccess} from "./redux/actions/actions"


const routes = createRoutes()

function App() {

	const dispatch = useDispatch()

	useEffect(() => {
		// init
		if(localStorage.getItem("token")) {
			// ako ima token treba da konatktira akpi da dobije osnovne podatke o ulogovanmom korisniku
			// od responsea taviusi da li ostajemo izlogovani ili ulogovani
			dispatch(loginSuccess("user"))
		} else {
			// ako nema tokena odmah treba da upise u state da si izlogovan
			dispatch(loginError("nismo ulogovani jer nema tokena"))
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
