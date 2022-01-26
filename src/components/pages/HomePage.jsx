import Sidebar from "../shared/Sidebar"
import { Outlet } from "react-router"
import TopNav from "./TopNav"

export const HomePage = () => {
	return (
		<div>
			<Sidebar/>
			<div className="main">
				<div className="main__content">
					<TopNav />
					<Outlet />
				</div>
			</div>
		</div>
	)
}