import React, {useEffect, useState} from "react"
import {useTheme} from "../../contexts/ThemeProvider"

const ToggleTheme = () => {

	const {theme, toggleTheme} = useTheme()
	
	const [toggle, setToggle] = useState(theme==='dark')

	useEffect(() => console.log(theme), [theme])

	const handleToggle = e => {
		e.stopPropagation()
		e.preventDefault()
		toggleTheme()
		setToggle(!toggle)
	}

	return (
		<div>
			
			<div className="flex justify-center items-center" onClick={handleToggle}>

				<div className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear ${toggle === true ? 'bg-green-400' : 'bg-gray-400'}`}>
					<label htmlFor="toggle"
						className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${toggle === true ? 'translate-x-full border-green-400' : 'translate-x-0 border-gray-400'}`}></label>
					<input type="checkbox" id="toggle" name="toggle"
						className="appearance-none w-full h-full active:outline-none focus:outline-none"
						defaultChecked={toggle} />
				</div>
			</div>
		</div>
	)
}

export default ToggleTheme