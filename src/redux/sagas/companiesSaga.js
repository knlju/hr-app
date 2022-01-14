import {all, take, call, put} from "redux-saga/effects"
import {
	FETCH_COMPANIES_START,
	fetchCompaniesError, fetchCompaniesSuccess
} from "../actions/actions"
import {getAllCompanies} from "../../api"

function* fetchCompanies() {
	try {
		const {data} = yield call(getAllCompanies)
		if (data) {
			console.log("data:", data)
			yield put(fetchCompaniesSuccess(data))
		}
	} catch (error) {
		yield put(fetchCompaniesError(error))
	}
}

function* fetchCompaniesWatcher() {
	while (true) {
		yield take(FETCH_COMPANIES_START)
		yield call(fetchCompanies)
	}
}

export default function* () {
	yield all([fetchCompaniesWatcher()])
}
