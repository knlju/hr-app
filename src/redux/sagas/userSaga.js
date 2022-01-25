import {all, take, call, put, race, select} from "redux-saga/effects"
import actions, {
	loginError,
	loginSuccess,
	logoutError,
	logoutSuccess,
	registerSuccess,
	registerError,
	createProfileError,
	createProfileSuccess,
	createCompanyStart,
	createProfileStart,
	uploadImageStart, uploadImageSuccess, uploadImageError,
} from "../actions/actions"
import api from "../../api"

function* login({email, password}) {
	try {
		const {data} = yield call(api.loginUser, {email, password})
		if (data) {
			localStorage.setItem("token", data.jwt)
			yield put(loginSuccess(data.user))
		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(loginError("Login epic Fail"))
		}
	} catch (error) {
		yield put(loginError(error.message))
	}
}

// TODO: polako s register
function* register(payload) {
	try {
		const {username, email, password} = payload
		const {data} = yield call(api.registerUser, {username, email, password})
		if (data) {
			localStorage.setItem("token", data.jwt)
			yield put(registerSuccess(data.user))
			yield call(registerOrchestrator, payload)
		} else {
			// TODO: da li ovo treba da se proverava? :)
			yield put(registerError("Register Failed"))
		}
	} catch (error) {
		yield put(registerError(error.message))
	}
}

function* registerWatcher() {
	while (true) {
		const {payload} = yield take(actions.REGISTER_START)
		yield call(register, payload)
	}
}

function* uploadImage(payload) {
	try {
		const image = payload
		const data = yield call(api.uploadImage, image)
		if (data) {
			yield put(uploadImageSuccess(data))
		} else {
			yield put(uploadImageError("Upload Failed"))
		}
	} catch (error) {
		yield put(uploadImageError(error.message))
	}
}

function* uploadImageWatcher() {
	while (true) {
		const {payload} = yield take(actions.UPLOAD_IMAGE_START)
		// eslint-disable-next-line no-debugger
		debugger
		yield call(uploadImage, payload)
	}
}

// TODO: add response checking (error, data, etc.)
function* createNewProfile({name, company, user, userRole, profilePhoto = undefined}) {
	try {
		const requestConfig = {name, company, user, userRole}
		if (profilePhoto !== undefined) {
			requestConfig.profilePhoto = profilePhoto
		}
		const {data} = yield call(api.createProfile, requestConfig)
		if (data) {
			yield put(createProfileSuccess(data.data.attributes))
		} else {
			yield put(createProfileError("Data error"))
		}
	} catch (error) {
		yield put(createProfileError(error))
	}
}

function* createNewProfileWatcher() {
	while (true) {
		const {payload} = yield take(actions.CREATE_PROFILE_START)
		// eslint-disable-next-line no-debugger
		debugger
		yield createNewProfile(payload)
	}
}

function* logout() {
	try {
		yield call(api.logoutUser)
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

/**
 * Orchestrator saga
 * Called in register saga
 * creates a new profile,
 * creates a new company if company is an object
 * uploads a file if provided
 */
function* registerOrchestrator(payload) {
	// {name, email, password, role, company : Number or Object, image : optional}
	let {username, userRole, company} = payload
	let profileConfig = {}

	try {
		if (typeof company === "object") {
			// The company is an object {name, slug}
			yield put(createCompanyStart(company))

			const {error: companyCreationError} = yield race({
				success: take(actions.CREATE_COMPANY_SUCCESS),
				error: take(actions.CREATE_COMPANY_ERROR)
			})

			if (companyCreationError) {
				// TODO: rollback
				return
			}

			company = yield select(state => state.companies.createdCompany.id)
		}

		if (Object.prototype.hasOwnProperty.call(payload, "image")) {
			// eslint-disable-next-line no-debugger
			debugger
			const {image} = payload
			yield put(uploadImageStart(image))

			const {error: uploadImageError} = yield race({
				success: take(actions.UPLOAD_IMAGE_SUCCESS),
				error: take(actions.UPLOAD_IMAGE_ERROR)
			})

			if (uploadImageError) {
				// TODO: rollback
				return
			}

			const profilePhotoId = yield select(state => state.user.image.id)
			profileConfig.profilePhoto = profilePhotoId
		}

		// Company is companyId integer Number
		const name = username
		const user = yield select(state => state.user.user.id)

		// Create profile
		profileConfig = {...profileConfig, name, company: parseInt(company), user: parseInt(user), userRole}
		yield put(createProfileStart(profileConfig))

		const {error: profileCreationError} = yield race({
			success: take(actions.CREATE_PROFILE_SUCCESS),
			error: take(actions.CREATE_PROFILE_ERROR)
		})

		if (profileCreationError) {
			// TODO: rollback
			return
		}
	} catch (error) {
		yield put(registerError(error.message))
	}
}

export default function* () {
	yield all([loginWatcher(), logoutWatcher(), registerWatcher(), uploadImageWatcher(), createNewProfileWatcher()])
}
