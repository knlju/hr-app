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
			// ako ima token treba da konatktira akpi da dobije osnovne podatke o ulogovanmom korisniku
			// od responsea taviusi da li ostajemo izlogovani ili ulogovani
			dispatch(loginWithTokenStart(token))
		}
		// else {
		// 	// ako nema tokena odmah treba da upise u state da si izlogovan
		// 	dispatch(loginError("nismo ulogovani jer nema tokena"))
		// }
	})

	return (
		<>
			{routes}
		</>
	)
}

export default App
