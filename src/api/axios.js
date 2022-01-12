import axios from "axios"
import jwtDecode from "jwt-decode"

const axiosInstance = axios.create({
	// baseURL: "https://internship-hr-app.herokuapp.com",
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.request.use((req) => {
	const token = localStorage.getItem("token")
	console.log("intercepted!", req)
	// Throws an error for bad token
	try {
		console.log(jwtDecode(token))
	}
	catch (error) {
		console.log("token doesn't work:", error)
	}
	if (token) {
		console.log("token:", token)
		req.headers.Authorization = `Bearer ${token}`
	}
	return req
})

export default axiosInstance