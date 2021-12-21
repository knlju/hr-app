import React, {useEffect} from "react"
import {useTheme} from "../../contexts/ThemeProvider"
// import PropTypes from "prop-types"

const ToggleTheme = () => {

	const {theme, toggleTheme} = useTheme()

	useEffect(() => console.log(theme), [theme])

	return (
		<div>
			<button onClick={toggleTheme}>
                Toggle Theme!
			</button>
		</div>
	)
}

// ToggleTheme.propTypes = {
//
// }

export default ToggleTheme