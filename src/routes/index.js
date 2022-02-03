import {Route, Routes} from "react-router-dom"
import LoginPage from "../components/pages/LoginPage"
import RegisterPage from "../components/pages/RegisterPage"
import { MainLayout} from "../components/pages/MainLayout"
import ProtectedRoutes from "./ProtectedRoutes"
import { PendingPage } from "../components/pages/PendingPage"
import { Company } from "../components/pages/Company"
import { MyProfile } from "../components/pages/MyProfile"
import EditUserPage from "../components/pages/EditUserPage"
import AddQuestion from "../components/pages/questions/AddQuestion"
import JoinPage from "../components/pages/JoinPage"
import {ROLES} from "../constants"
import TeamPageRoleRoute from "./TeamPageRoleRoute"
import QuestionsRoleRoute from "./QuestionsRoleRoute"

const createRoutes = () => (
	<Routes>
		<Route element={<MainLayout/>}>

			{/* Public routes */}

			<Route path="/" element={<>Company wall</>}/>

			{/*Admin routes */}

			<Route element={<ProtectedRoutes allowedRoles={[ROLES.admin]} />}>
				<Route path="/pending" element={<PendingPage/>}/>
				<Route path="/team/:id/edit" element={<EditUserPage/>}/>
				<Route path="/add-question" element={<AddQuestion />} />
				<Route path="/edit-question/:id" element={<AddQuestion modeEdit={true}/>} />
				<Route path="/company" element={<Company/>}/>
			</Route>

			{/* User routes */}

			<Route element={<ProtectedRoutes allowedRoles={[ROLES.admin, ROLES.user]} />}>
				<Route path="/team" element={<TeamPageRoleRoute/>}/>
				<Route path="/questions" element={<QuestionsRoleRoute/>}/>
				<Route path="/myprofile" element={<MyProfile/>}/>
			</Route>

			{/* Logged out */}

			<Route element={<ProtectedRoutes unauthenticated />}>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/join/:slug" element={<JoinPage/>}/>
			</Route>

			{/* Catch all */}
			<Route path="*" element={<div><h1>Yay 404</h1></div>}/>
		</Route>
	</Routes>
)


export default createRoutes