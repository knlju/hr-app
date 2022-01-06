// TODO: Ovo je API fajl za sad
import axios from "axios"


//TODO: Ovo je samo privremeno
const endPoint = `https://internship-hr-app.herokuapp.com/api/auth/local`


export const registerUser = async ({name, email, password, b64image}) => {

	// TODO: kako se slika uploaduje?
	console.log(b64image, "This is b64 of the image")
	console.log(name, "This is name lol")
	console.log({name, email, password, b64image})

	const response = await axios.post(`https://internship-hr-app.herokuapp.com/api/auth/local/register`, {
		// identifier: "nemraci1234@gmail.com",
		// password: "asdfjkl;"
		identifier: name,
		email: email,
		password: password
	})
	const data = response.data

	localStorage.setItem("token", `Bearer ${data.jwt}`)

	return data
}

export const loginUser = ({email, password}) => {
// export const loginUser = async () => {
	return axios.post(endPoint, {
		// identifier: "nemraci1234@gmail.com",
		// password: "asdfjkl;"
		identifier: email,
		password: password
	})
	// const data = response.data
	// localStorage.setItem("token", `Bearer ${data.jwt}`)
	// document.cookie = `Authorization=Bearer ${data.jwt}`
	// console.log(data)
	// return data
}

export const logoutUser = () => {
	// ? TODO: ne mora ovde promise i tamo call
	return new Promise(() => localStorage.removeItem("jwt"))
	// return firebase
	//   .auth()
	//   .signOut()
	//   .then(function () {
	//   })
	//   .catch((error) => Promise.reject(error));
}

export const fetchQuestions = async () => {
	const response = await axios.get("https://internship-hr-app.herokuapp.com/api/questions", {
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