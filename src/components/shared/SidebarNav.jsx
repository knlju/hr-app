const adminNav = [
	{
		link: "/",
		section: "company wall",
		icon: <i className='fas fa-home fa-fw mr-3'/>,
		text: "company wall"
	},
	{
		link: "/pending",
		section: "pending",
		icon: <i className='fas fa-user-clock fa-fw mr-3' />,
		text: "Pending"
	},
	{
		link: "/team",
		section: "team",
		icon: <i className='fas fa-users fa-fw mr-3'/>,
		text: "Team"
	},
	{
		link: "/questions",
		section: "questions",
		icon: <i className='fas fa-question-circle fa-fw mr-3'/>,
		text: "Questions"
	},
	{
		link: "/company",
		section: "company",
		icon: <i className='fas fa-building fa-fw mr-3'/>,
		text: "Company"
	},
	{
		link: "/myprofile",
		section: "myprofile",
		icon: <i className='fa fa-id-card fa-fw mr-3'/>,
		text: "My profile"
	}
]

const userNav = [
	{
		link: "/team",
		section: "team",
		icon: <i className='fas fa-users fa-fw mr-3'/>,
		text: "Team"
	},
	{
		link: "/questions",
		section: "questions",
		icon: <i className='fas fa-question-circle fa-fw mr-3'/>,
		text: "Questions"
	},
	{
		link: "/myprofile",
		section: "myprofile",
		icon: <i className='fa fa-id-card fa-fw mr-3'/>,
		text: "My profile"
	}
]

const guestNav = [
	{
		link: "/",
		section: "company wall",
		icon: <i className='fas fa-home fa-fw mr-3'/>,
		text: "company wall"
	}
]

const NAVIGATION = {
	admin: adminNav,
	user: userNav,
	guest: guestNav
}

export default NAVIGATION