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
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<App/>
					</QueryClientProvider>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
