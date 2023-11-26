import React, { useContext } from "react"
import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import { UserContext } from "../components/UserContextProvider"
import JsonServerApi from "../utils/JsonServerApi"

const noteLoader = async ({ params: { id } }) => {
	const jsonServerApi = new JsonServerApi()
	const note = await jsonServerApi.getNote(id)
	return { note }
}

const ViewNote = () => {
	const { note } = useLoaderData()
	const navigate = useNavigate()
	const { user } = useContext(UserContext)

	const handleDeleteNote = async (note) => {
		const jsonServerApi = new JsonServerApi()
		await jsonServerApi.deleteNote(user.id, note)
		navigate(`/user/${user.id}/notes`)
	}

	return (
		<div>
			<div className='flex justify-between items-center mt-4'>
				<div className='mt-4 mr-4'>
					<NavLink
						to={`/user/${user.id}/notes`}
						className='bg-gray-300 text-gray-700 px-4 py-2 rounded ml-4'
					>
						Назад
					</NavLink>
				</div>
				<div className='font-bold text-2xl'>{note.name}</div>
				<div className='flex'>
					<NavLink
						to={`/redactnote/${note.id}`}
						className='text-blue-500 mr-4'
					>
						<span role='img' aria-label='Edit Note'>
							✍️
						</span>
					</NavLink>
					<button
						onClick={() => handleDeleteNote(note)}
						className='text-red-500 mr-4'
					>
						<span role='img' aria-label='Delete Note'>
							🗑️
						</span>
					</button>
				</div>
			</div>
			<pre className='bg-gray-200 text-lg p-3 m-4'>{note.text}</pre>
		</div>
	)
}

export { ViewNote, noteLoader }
