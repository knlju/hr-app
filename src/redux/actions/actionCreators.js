// TODO: legacy fajl, refaktorisati

import {LOGIN_USER} from "./actions"

// Iz dokumentacije react-redux za smanjenje boilerplate-a
// uzima tip akcije i imena argumenata i pravi objekat izgleda:
// {
// 	type: type,
// 	payload: {...argNames: null}
// }

function makeActionCreator(type, ...argNames) {
	return function (...args) {
		const action = {type}
		if (argNames.length > 0) {
			const payload = {}
			argNames.forEach((arg, index) => {
				payload[argNames[index]] = args[index]
			})
			action.payload = payload
		}
		console.log("action:!!", action)
		return action
	}
}

// konzumira makeActionCreator
export const loginUser = makeActionCreator(LOGIN_USER, "name")

// umesto svega ovoga moze i ovako

// import {LOGIN_USER} from "./actions"
//
// export const loginUser = (user) => ({
// 	type: LOGIN_USER,
// 	payload: user
// })
