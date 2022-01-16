import {all, take, call, put, race} from "redux-saga/effects"
import actions, {
	loginError,
	loginSuccess,
	logoutError,
	logoutSuccess,
	registerSuccess, registerError,
} from "../actions/actions"
import {loginUser, logoutUser, registerUser, createProfile} from "../../api"
import {type} from "@testing-library/user-event/dist/type"

function* login({email, password}) {
	console.log("*login")
	try {
		const {data} = yield call(loginUser, {email, password})
		console.log("login, data", data)
		if (data) {
			console.log("login, data 2")
			localStorage.setItem("token", data.jwt)
			yield put(loginSuccess(data.user))
		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(loginError("Login epic Fail"))
		}
	} catch (error) {
		yield put(loginError(error.message))
		console.log(error)
	}
}

// TODO: polako s register
function* register({username, email, password}) {
	try {
		const {data} = yield call(registerUser, username, email, password)
		console.log("function* register:", data)
		if (data) {
			console.log("function* register 2:", data)

			yield put(registerSuccess(data.user))

		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(registerError("Login epic Fail"))
		}
	} catch (error) {
		yield put(registerError(error.message))
	}
}

function* logout() {
	try {
		yield call(logoutUser)
		yield put(logoutSuccess())
	} catch (error) {
		yield put(logoutError(error.message))
	}
}

// This is a watcher saga, I think
function* loginWatcher() {
	while (true) {
		const {payload} = yield take(actions.LOGIN_START)
		yield call(login, payload)
	}
}

function* logoutWatcher() {
	while (true) {
		yield take(actions.LOGOUT_START)
		yield call(logout)
	}
}

// This is also a watcher saga, I think
// function* registerWatcher() {
// 	while (true) {
// 		const {payload} = yield take(actions.REGISTER_START)
// 		console.log("registerWatcher")
// 		console.log("-----------")
// 		console.log(payload)
// 		console.log("-----------")
// 		const {username, email, password} = payload
// 		console.log("username, email, password", username, email, password)
// 		const res = yield call(register, username, email, password)
// 		console.log("res", res)
// 	}
// }


// function* registerFlow() {
// 	while (true) {
// 		// const {payload: registerPayload} =  yield take(REGISTER_SUCCESS)
// 		// const {payload: createCompanyPayload} =  yield take(CREATE_COMPANY_START)
// 		// const data = yield call(createCompany, createCompanyPayload)
// 		// console.log(data)
// 		try {
// 			// {name, email, password, role, company : Number or Object, image : optional}
// 			const {payload} = yield take(actions.REGISTER_START)
// 			console.log("registerFlow")
// 			// console.log("payload"payload)
// 			// const {name: username, email, password} = payload
// 			// const registerRes = yield call(register, username, email, password)
// 			// console.log("registerRes:", registerRes)
//
// 			const {success: registerSuccess, error: registerError} = yield race({
// 				success: take(actions.REGISTER_SUCCESS),
// 				error: take(actions.REGISTER_ERROR)
// 			})
//
// 			if (registerError) {
// 				console.log("registerError:", registerError)
// 				// TODO: rollback
// 				return
// 			}
//
// 			console.log("registerSuccess:", registerSuccess)
//
// 			// let companyRes
// 			// if (typeof payload.company === "object") {
// 			//
// 			// }
//
// 		} catch (error) {
// 			console.log(error)
// 			// TODO: find a way for handling errors
// 			yield put(actions.REGISTER_ERROR)
// 		}
// 	}
// }

/**
 * Yeah
 */
function* ljubinoDjubre() {
	// {name, email, password, role, company : Number or Object, image : optional}
	while(true){
		const {payload} = yield take(actions.REGISTER_START)
		const {username, email, password, userRole, company, image} = payload
		console.log("{username, email, password, role, company, image}", {username, email, password, userRole, company, image})
		try {
			const {data} = yield call(registerUser, payload)
			console.log("function* register:", data)
			if (data) {
				console.log("function* register 2:", data)

				yield put(registerSuccess(data.user))
				if(typeof company === "object") {
					//	The company is an object {name, slug}
					// TODO: add a new company
				}
				// Company is companyId integer Number
				const name = username
				const user = data.user.id
				yield call(createProfile, {name, company: parseInt(company), user: parseInt(user), userRole})
			} else {
				// TODO: da li ovo treba da se proverava? :)
				yield put(registerError("Login epic Fail"))
			}
		} catch (error) {
			// yield put(registerError(error.message))
			console.log("Register errpr")
		}
	}
}

export default function* () {
	// yield all([loginWatcher(), logoutWatcher(), registerWatcher()])
	// yield all([loginWatcher(), logoutWatcher(), registerWatcher(), registerFlow()])
	yield all([loginWatcher(), logoutWatcher(), ljubinoDjubre()])
}
