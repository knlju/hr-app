import {all, take, call, put} from "redux-saga/effects"
import {
	loginFail,
	loginSuccess,
	LOGIN_START,
	logoutFail,
	logoutSuccess,
	LOGOUT_START,
	registerStart, registerSuccess, registerFail, REGISTER_START
} from "../actions/actions"
import {loginUser, logoutUser} from "../../api"

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
function* register({name, email, password, b64image}) {
	try {
		const {data} = yield call(registerStart, {name, email, password, b64image})
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

function* logoutWatcher(){
	while(true) {
		yield take(LOGOUT_START)
		yield call(logout)
	}
}

// This is also a watcher saga, I think
function* registerWatcher() {
	while (true) {
		const {payload} = yield take(REGISTER_START)
		yield call(register, payload)
	}
}

export default function* () {
	yield all([loginWatcher(), logoutWatcher(), registerWatcher()])
}
