import Navbar from "./components/shared/Navbar/Navbar"
import createRoutes from "./routes"

const routes = createRoutes()

function App() {
	return (
		<>
			<Navbar/>
			{routes}
		</>
	)
}

export default App
