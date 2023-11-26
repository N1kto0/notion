import { Navigate } from "react-router-dom"
import { UserContext } from "./UserContextProvider"
import { useContext } from "react"

export default function RequireAuth({ children }) {
	let { user, loading } = useContext(UserContext)

	if (loading) {
		return (
			<div className='text-gray-500 text-2xl flex items-center justify-center h-full'>
				Loading...
			</div>
		)
	}

	if (!user?.id) {
		return <Navigate to='/login' replace />
	}

	return children
}
