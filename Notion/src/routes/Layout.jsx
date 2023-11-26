import { useContext } from "react"
import { UserContext } from "../components/UserContextProvider"
import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
	const { user } = useContext(UserContext)

	return (
		<div className='flex flex-col h-screen'>
			<div className='bg-gray-800 text-white p-4 flex justify-between items-center'>
				<div>Hello {user.email}</div>
				<div className='flex'>
					<NavLink to='/home' className='ml-4'>
						About
					</NavLink>
					<NavLink to={`/user/${user.id}/notes`} className='ml-4'>
						Notes
					</NavLink>
					<NavLink
						onClick={() => localStorage.clear()}
						to='/login'
						className='ml-4'
					>
						Log out
					</NavLink>
				</div>
			</div>
			<hr className='border-t' />
			<main className='flex-grow'>
				<Outlet />
			</main>
			<hr className='border-t' />
			<footer className='flex justify-between p-4 bg-gray-800 text-white'>
				<div>Created by: Alexey Burimskiy</div>
				<div>BSU 2023</div>
			</footer>
		</div>
	)
}