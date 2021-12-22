import React, {useState} from "react"

const RegisterPage = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [selectedFile, setSelectedFile] = useState(null)

	const submitRegistration = (e) => {
		e.preventDefault()
	}


	return (
		<>
			<div>
				<h1>Register</h1>
				<form>
					<label htmlFor="name">name</label>
					<input type="text" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)}/>

					<label htmlFor="email">email</label>
					<input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>

					<label htmlFor="name">password</label>
					<input type="text" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

					<label htmlFor="image">image</label>
					<input type="file" name="image" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])}/>

					<div>
						<p>already have acc?</p>
						<button type="submit" onSubmit={submitRegistration}>register</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default RegisterPage