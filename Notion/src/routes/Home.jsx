import { useContext } from "react"
import { UserContext } from "../components/UserContextProvider"
import { NavLink } from "react-router-dom"

export default function Home() {
	const { user } = useContext(UserContext)

	return (
		<div className='flex flex-col items-center'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-4'>About Me</h1>
				<div className='mb-8'>
					<p className='font-bold mb-2'>Email:</p>
					<p>{user.email}</p>
				</div>
				<div className='mb-8'>
					<p className='font-bold mb-2'>Date sign up:</p>
					<p>{user.created}</p>
				</div>
				<NavLink
					to={`/user/${user.id}/notes`}
					className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
				>
					Go to notes
				</NavLink>
			</div>
		</div>
	)
}
