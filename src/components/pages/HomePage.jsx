import Sidebar from "../shared/Sidebar"
import {useSelector} from "react-redux"
import { Outlet } from "react-router"
import TopNav from "./TopNav"

export const HomePage = () => {

	const image = useSelector(state => state.user.image)

	return (
		<div>
			{/* <h1>HomePage</h1> */}
			{/* TODO: gde ubaciti Sidebar komponentu */}
			{image && JSON.stringify(image)}
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