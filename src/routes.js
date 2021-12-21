import {Route, Routes} from "react-router-dom"
import LoginPage from "./components/pages/LoginPage"
import RegisterPage from "./components/pages/RegisterPage"
import {HomePage} from "./components/pages/HomePage"

const createRoutes = () => (
	<Routes>
		<Route path="/login" element={<LoginPage/>}/>
		<Route path="/register" element={<RegisterPage/>}/>
		<Route path="/" element={<HomePage/>}/>
		<Route path="*" element={<div><h1>Yay 404</h1></div>}/>
	</Routes>
)

export default createRoutes