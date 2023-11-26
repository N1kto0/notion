import { createContext, useEffect, useState } from "react"
import JsonServerApi from "../utils/JsonServerApi"

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const id = localStorage.getItem("userId")

        async function fetchData() {
            const jsonServerApi = new JsonServerApi()
            await jsonServerApi.getUser(id)
				.then((user) => {
					setUser(user)
					setLoading(false)
				})
				.finally(() => {
					setLoading(false)
				})
        }
        
		if (id) {
            fetchData()
		} else {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (user?.id) {
			localStorage.setItem("userId", user.id)
		}
	}, [user?.id])

	return (
		<UserContext.Provider value={{ user, onChange: setUser, loading }}>
			{children}
		</UserContext.Provider>
	)
}
