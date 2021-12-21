import React, {createContext, useContext, useEffect, useState} from "react"
import PropTypes from "prop-types"

const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)

// TODO: dodati reducer, ili je to previse za ovako mali use case

const ThemeProvider = ({children}) => {

	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")

	const toggleTheme = () => setTheme(oldTheme => oldTheme === "dark" ? "light" : "dark")

	useEffect(() => localStorage.setItem("theme", theme), [theme])

	const value = {
		theme,
		toggleTheme
	}

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	)
}

ThemeProvider.propTypes = {
	children: PropTypes.node
}

export default ThemeProvider