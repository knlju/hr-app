import {Route, Routes} from "react-router-dom"
import LoginPage from "../components/pages/LoginPage"
import RegisterPage from "../components/pages/RegisterPage"
import {HomePage} from "../components/pages/HomePage"
import ProtectedRoutes from "./ProtectedRoutes"
import { Pending } from "../components/pages/Pending"
import { TeamPage } from "../components/pages/TeamPage"
import { Questions } from "../components/pages/Questions"
import { Company } from "../components/pages/Company"
import { MyProfile } from "../components/pages/MyProfile"

const createRoutes = () => (
	<Routes>
		{/* <Route path="/" element={<HomePage/>}/> */}
		<Route path="/" element={<HomePage/>}>
			<Route path="/team" element={<TeamPage/>}/>
			<Route element={<ProtectedRoutes  />}>
				<Route path="/pending" element={<Pending/>}/>
				<Route path="/questions" element={<Questions/>}/>
				<Route path="/company" element={<Company/>}/>
				<Route path="/myprofile" element={<MyProfile/>}/>
			</Route>
			<Route element={<ProtectedRoutes companyUser />}>
				<Route path="/myprofile" element={<MyProfile/>}/>
			</Route>
			<Route element={<ProtectedRoutes loggedOutOnly />}>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
			</Route>
			<Route path="*" element={<div><h1>Yay 404</h1></div>}/>
		</Route>
	</Routes>
)


export default createRoutes