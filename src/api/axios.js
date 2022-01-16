import axios from "axios"
import jwtDecode from "jwt-decode"

export const axiosInstanceWithAuth = axios.create({
	baseURL: process.env.REACT_APP_SERVER_ADDRESS,
})

export const axiosInstanceWithoutAuth = axios.create({
	baseURL: process.env.REACT_APP_SERVER_ADDRESS,
})

// TODO: Ako je token istekao izloguj korisnika
// TODO: hmm da li se ovako dodaje korisnik
axiosInstanceWithAuth.interceptors.request.use((req) => {
	const token = localStorage.getItem("token")
	console.log("intercepted!", req)
	// Throws an error for bad token
	if (token) {
		console.log("token:", token)
		try {
			console.log(jwtDecode(token))
		}
		catch (error) {
			console.log("token doesn't work:", error)
		}
	}
	req.headers.Authorization = `Bearer ${token}`
	return req
})
