// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import { firebaseConfig } from './firebase';

// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();
import axios from "axios"


const endPoint = `https://internship-hr-app.herokuapp.com/api/auth/local`



export const registerUser = async () => {
  
	const response = await fetch("https://example.com/profile", {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			identifier: "nemraci1234@gmail.com",
			password: "asdfjkl;"}),
	})
	const data = await response.json()
      
	return data
}

export const loginUser = async () => {
	const response = await fetch(endPoint, {
		method: "POST", // or 'PUT'
		headers: {
			"Content-Type": "application/json",
		},
		// credentials: 'include',
		body: JSON.stringify({
			identifier: "nemraci1234@gmail.com",
			password: "asdfjkl;"}),
	})
	const data = await response.json()
	localStorage.setItem("token", data.jwt)
	console.log(data)
	return data
}

export const logoutUser = () => {
	// return firebase
	//   .auth()
	//   .signOut()
	//   .then(function () {
	//   })
	//   .catch((error) => Promise.reject(error));
}

export const fetchQuestions = async () => {
	const response = await axios.get("https://internship-hr-app.herokuapp.com/api/questions", {
		// method: 'GET', 
		headers: {
			"Content-Type": "application/json",
			"Accept" : "application/json",
			// 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		// mode: "cors",
		// credentials: 'include',
	})
	const data =  response.data
	console.log(data)
	return data 
}