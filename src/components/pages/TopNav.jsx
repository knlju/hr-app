import React from "react"

const TopNav = () => {
	const openSidebar = () => {
		document.body.classList.add("sidebar-open")
	}

	return (
		<div className='topnav'>
			<div className="sidebar-toggle" onClick={openSidebar}>
				<i className="fas fa-bars"></i>
			</div>
		</div>
	)
}

export default TopNav