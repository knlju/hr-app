export const formatDate = (date) => {
	return new Date(date).toLocaleDateString("en-US",{ year: "numeric", month: "short", day: "2-digit" })
}

export const _extractQuestionById = (id, arr) => {
	let selected = null
	arr.forEach(question => {
		if (question.id === id) {
			selected = question.attributes.text
		}
	})
	return selected
}
export const _extractQuestionType = (id, arr) => {
	let type = null
	arr.forEach(question => {
		if (question.id === id) {
			type = question.attributes.type
		}
	})
	return type
}

export const _makeUniqueOrder = (uniqueOrders) => {
	let ord = 0
	let exit = false
	while (exit === false) {
		if (parseInt(ord) in uniqueOrders) {
			ord++
		} else {
			exit = true
		}
	}
	return ord
}

export const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
