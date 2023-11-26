import React, { useState } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import JsonServerApi from "../utils/JsonServerApi"
import { z } from "zod"

export default function RegistrationForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		repeatPassword: "",
	})
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleSignUp = async () => {
		setError("")
		const UserSchema = z.object({
			email: z.string().email("Invalid email"),
			password: z
				.string()
				.min(8, "Password must contain at least 8 characters")
				.refine((value) => /[A-Z]/.test(value), {
					message:
						"Password must contain at least one uppercase letter",
				})
				.refine((value) => /[a-z]/.test(value), {
					message:
						"Password must contain at least one lowercase letter",
				})
				.refine((value) => /[0-9]/.test(value), {
					message: "Password must contain at least one digit",
				}),
			date: z.number(),
		})

		try {
			const a = UserSchema.parse({
				email: formData.email,
				password: formData.password,
				date: 1,
			})
			if (formData.password != formData.repeatPassword)
				throw new Error("Пароли не совпадают")

			const jsonServerApi = new JsonServerApi()
			const user = await fetch(
				`http://localhost:5001/users?email=${formData.email}`
			).then((r) => r.json())

			if (user.length) {
				throw new Error("Пользователь с таким email уже существует")
			}
			await jsonServerApi.createUser({
				email: formData.email,
				password: formData.password,
				created: new Date().toLocaleString(),
			})

			navigate("/login")
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errorMessage = error.errors
					.map((e) => e.message)
					.join(".")
				setError(errorMessage)
			} else {
				setError(error.message)
			}
		}
	}

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md'>
			<h2 className='text-2xl font-bold mb-6'>Sign Up</h2>
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
			<input
				type='password'
				name='repeatPassword'
				value={formData.repeatPassword}
				onChange={handleChange}
				placeholder='Repeat Password'
				className='border rounded-md border-gray-300 p-2 w-full mb-4'
			/>
			<div className='flex justify-between'>
				<NavLink
					to='/login'
					className='text-gray-500 text-sm flex items-center'
				>
					Already signed up?
				</NavLink>
				<button
					onClick={handleSignUp}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Sign Up
				</button>
			</div>
		</div>
	)
}
