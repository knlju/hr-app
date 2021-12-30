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
import {loginUser, logoutUser} from "../utils/index"

// function* authenticate({email, password, isRegister}) {
//   try {
//     let data
//     if(isRegister) {
//       data = yield call(registerUser, {email, password})
//     } else {
//       data = yield call(loginUser, {email, password})
//     }
//     yield put(authSuccess(data.user))
//     return data.user.uid
//   } catch (error) { 
//     yield put(authFail(error.message))
//   }
// }

function* login({email, password}) {
	try {
		const {data} = yield call(loginUser, {email, password})
		if (data) {
			yield put(loginSuccess(data.user))
		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(loginFail("Login epic Fail"))
		}
	} catch (error) {
		yield put(loginFail(error.message))
	}
}
// b64 image is base 64 because JSON doesn't support blob
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

// function* throwErrorSaga() {
// 	yield delay(1000)
// 	yield call(()=>{
// 		throw Error("New Error from saga")
// 	})
// }

// This is a watcher saga, I think
function* loginFlow() {
	while (true) {
		const {payload} = yield take(LOGIN_START)
		yield call(login, payload)
		yield take(LOGOUT_START)
		yield call(logout, payload)
		// const uid = yield call(authenticate, payload) //firebase has the userId
		// const forkedSaga = yield fork(longRunningYield)
		// // yield spawn(throwErrorSaga)
		// if(uid) {
		// 	yield take (LOGOUT_START)
		// 	yield call(logout)
		// 	yield cancel(forkedSaga)
		// }
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
	yield all([loginFlow(), registerWatcher()])
}

