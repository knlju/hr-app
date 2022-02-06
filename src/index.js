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
import store, {Persistor} from "./redux/store"
import {QueryClient, QueryClientProvider} from "react-query"
import {PersistGate} from "redux-persist/integration/react"

const queryClient = new QueryClient()

console.log(React.version)

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={Persistor}>
				<ThemeProvider>
					<BrowserRouter>
						<QueryClientProvider client={queryClient}>
							<App/>
						</QueryClientProvider>
					</BrowserRouter>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
