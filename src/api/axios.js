import axios from "axios"
import jwtDecode from "jwt-decode"

export const axiosInstanceWithAuth = axios.create({
	baseURL: process.env.REACT_APP_SERVER_ADDRESS,
})

export const axiosInstanceWithoutAuth = axios.create({
	baseURL: process.env.REACT_APP_SERVER_ADDRESS,
})

// TODO: Ako je token istekao izloguj korisnika
axiosInstanceWithAuth.interceptors.request.use((req) => {
	const token = localStorage.getItem("token")
	// console.log("intercepted!", req)
	// Throws an error for bad token
	if (token) {
		// TODO izloguj korisnika mozda ili je to gotovo u sagi
	}
	req.headers.Authorization = `Bearer ${token}`
	return req
})
