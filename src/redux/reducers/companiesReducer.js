import {FETCH_COMPANIES_ERROR, FETCH_COMPANIES_START, FETCH_COMPANIES_SUCCESS} from "../actions/actions"

const initialState = {
	companies: [],
	isLoading: false,
	error: false
}

export default (state = initialState, {type, payload}) => {
	switch (type) {
	case FETCH_COMPANIES_START:
		return {
			...state,
			isLoading: true
		}
	case FETCH_COMPANIES_SUCCESS:
		console.log(FETCH_COMPANIES_SUCCESS)
		return {
			companies: payload.data,
			isLoading: false,
			error: false
		}
	case FETCH_COMPANIES_ERROR:
		return {
			companies: [],
			isLoading: false,
			error: false
		}
	default:
		return state
	}
}