import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducers"
import saga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	reducer,
	withDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(saga)

export default store
