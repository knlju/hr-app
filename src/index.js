import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
// Router
import {BrowserRouter} from "react-router-dom"
// Themes
import ThemeProvider from "./contexts/ThemeProvider"
// Redux
import {Provider} from "react-redux"
import store from "./redux/store"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<BrowserRouter>
					<App/>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
