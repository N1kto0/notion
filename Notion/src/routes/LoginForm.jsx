import React, { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvider"
import { useNavigate, NavLink } from "react-router-dom"

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const userContext = useContext(UserContext)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleLogin = async () => {
		const { email, password } = formData

		const query = new URLSearchParams({
			email,
			password,
		}).toString()

		fetch(`http://localhost:5001/users?${query}`)
			.then((response) => response.json())
			.then((users) => users[0])
			.then((user) => {
				if (user) {
					userContext.onChange(user)
					navigate("/home")
				} else {
					setError("Такого пользователя не существует")
				}
			})
	}

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md'>
			<h2 className='text-2xl font-bold mb-6'>Log In</h2>
			{error && (
				<p className='text-red-500 text-sm mb-4'>
					<strong>Error:</strong> {error}
				</p>
			)}
			<input
				type='email'
				name='email'
				value={formData.email}
				onChange={handleChange}
				placeholder='Email'
				className='border rounded-md border-gray-300 p-2 w-full mb-4'
			/>
			<input
				type='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
				placeholder='Password'
				className='border rounded-md border-gray-300 p-2 w-full mb-4'
			/>
			<div className='flex justify-between'>
				<NavLink
					to='/registration'
					className='text-gray-500 text-sm flex items-center'
				>
					Haven't signed up?
				</NavLink>

				<button
					onClick={handleLogin}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Log in
				</button>
			</div>
		</div>
	)
}
