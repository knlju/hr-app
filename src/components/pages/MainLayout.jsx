import Sidebar from "../shared/Sidebar"
import { Outlet } from "react-router"
import TopNav from "./TopNav"
import DragMain from "./questions/draganddrop/DragMain"

export const MainLayout = () => {
	return (
		<div>
			<Sidebar/>
			<div className="main">
				<div className="main__content">
					<TopNav />
					<Outlet />
					{/* <DragMain></DragMain> */}
				</div>
			</div>
		</div>
	)
}