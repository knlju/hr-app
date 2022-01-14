import {all, take, call, put} from "redux-saga/effects"
import {
	loginFail,
	loginSuccess,
	LOGIN_START,
	logoutFail,
	logoutSuccess,
	LOGOUT_START,
	registerStart, registerSuccess, registerFail, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL, CREATE_COMPANY_START
} from "../actions/actions"
import {createCompany, loginUser, logoutUser, registerUser} from "../../api"

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
			yield put(loginFail("Login epic Fail"))
		}
	} catch (error) {
		yield put(loginFail(error.message))
		console.log(error)
	}
}

// TODO: polako s register
function* register({name, email, password, role, image = false, company = false}) {
	try {
		const {data} = yield call(registerUser, name, email, password)
		console.log("function* register:", data)
		if (data) {
			yield put(registerSuccess(data.user))

		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(registerFail("Login epic Fail"))
		}
	} catch (error) {
		yield put(registerFail(error.message))
	}
}

function* logout() {
	try {
		yield call(logoutUser)
		yield put(logoutSuccess())
	} catch (error) {
		yield put(logoutFail(error.message))
	}
}

// This is a watcher saga, I think
function* loginWatcher() {
	while (true) {
		const {payload} = yield take(LOGIN_START)
		yield call(login, payload)
	}
}

function* logoutWatcher() {
	while (true) {
		yield take(LOGOUT_START)
		yield call(logout)
	}
}

// This is also a watcher saga, I think
function* registerWatcher() {
	while (true) {
		const {payload} = yield take(REGISTER_START)
		const res = yield call(register, payload)
		console.log(res)
	}
}


//
// function* registerFlow() {
// 	while(true) {
// 		const {payload: registerPayload} =  yield take(REGISTER_SUCCESS)
// 		const {payload: createCompanyPayload} =  yield take(CREATE_COMPANY_START)
// 		const data = yield call(createCompany, createCompanyPayload)
// 		console.log(data)
// 	}
// }

export default function* () {
	yield all([loginWatcher(), logoutWatcher(), registerWatcher()])
}
