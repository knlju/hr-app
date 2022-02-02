import {Route, Routes} from "react-router-dom"
import LoginPage from "../components/pages/LoginPage"
import RegisterPage from "../components/pages/RegisterPage"
import { MainLayout} from "../components/pages/MainLayout"
import ProtectedRoutes from "./ProtectedRoutes"
import { PendingPage } from "../components/pages/PendingPage"
import { TeamPage } from "../components/pages/TeamPage"
import { Questions } from "../components/pages/questions/Questions"
import { Company } from "../components/pages/Company"
import { MyProfile } from "../components/pages/MyProfile"
import EditUserPage from "../components/pages/EditUserPage"
import AddQuestion from "../components/pages/questions/AddQuestion"


import JoinPage from "../components/pages/JoinPage"

const createRoutes = () => (
	<Routes>
		{/* <Route path="/" element={<HomePage/>}/> */}
		<Route element={<MainLayout/>}>
			{/* <Route index path="/" element={<CompanyWallPage/>}/> */}
			<Route element={<ProtectedRoutes  />}>
				<Route path="/team" element={<TeamPage/>}/>
				<Route path="/team/pending" element={<PendingPage/>}/>
				<Route path="/team/:id/edit" element={<EditUserPage/>}/>
				<Route path="/questions" element={<Questions/>}/>
				<Route path="/add-question" element={<AddQuestion />} />
				<Route path="/edit-question/:id" element={<AddQuestion modeEdit={true}/>} />
				<Route path="/company" element={<Company/>}/>
				<Route path="/myprofile" element={<MyProfile/>}/>
			</Route>
			<Route element={<ProtectedRoutes companyUser />}>
				<Route path="/myprofile" element={<MyProfile/>}/>
			</Route>
			<Route element={<ProtectedRoutes loggedOutOnly />}>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/join/:slug" element={<JoinPage/>}/>
			</Route>
			<Route path="*" element={<div><h1>Yay 404</h1></div>}/>
		</Route>
	</Routes>
)


export default createRoutes