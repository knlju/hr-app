import Sidebar from "../shared/Sidebar"
import { Outlet } from "react-router"
import TopNav from "../shared/TopNav"

export const MainLayout = () => {
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