import { all } from "redux-saga/effects"
import authSaga from "./sagas/userSaga"

export default function* rootSaga() {
	yield all([authSaga()])
}