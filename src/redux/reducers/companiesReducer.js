import actions from "../actions/actions"

const initialState = {
	companies: [],
	isLoading: false,
	error: false
}

export default (state = initialState, {type, payload}) => {
	switch (type) {
	case actions.FETCH_COMPANIES_START:
		return {
			...state,
			isLoading: true
		}
	case actions.FETCH_COMPANIES_SUCCESS:
		console.log(actions.FETCH_COMPANIES_SUCCESS)
		return {
			companies: payload.data,
			isLoading: false,
			error: false
		}
	case actions.FETCH_COMPANIES_ERROR:
		return {
			companies: [],
			isLoading: false,
			error: false
		}
	default:
		return state
	}
}