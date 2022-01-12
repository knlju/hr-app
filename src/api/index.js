import axiosInstance from "./axios"
// import axios from "axios"

// eslint-disable-next-line no-unused-vars
export const registerUser = async ({name, email, password, b64image}) => {
	// TODO: kako se slika uploaduje?

	const response = await axiosInstance.post(`https://internship-hr-app.herokuapp.com/api/auth/local/register`, {
		// identifier: "nemraci1234@gmail.com",
		// password: "asdfjkl;"
		identifier: name,
		email: email,
		password: password
	})
	const data = response.data

	localStorage.setItem("token", data.jwt)

	return data
}

export const loginUser = ({email, password}) => {
	console.log(axiosInstance)

	return axiosInstance.post("https://internship-hr-app.herokuapp.com/api/auth/local", {
		identifier: email,
		password: password
	})
}

export const logoutUser = () => {
	console.log("logoutUser")
	localStorage.removeItem("token")
}

export const fetchQuestions = async () => {
	const response = await axiosInstance.get("https://internship-hr-app.herokuapp.com/api/questions", {
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			// "Authorization": localStorage.getItem("token")
		},
	})
	const data = response.data
	console.log(data)
	return data
}