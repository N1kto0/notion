import { useContext } from "react"
import JsonServerApi from "../utils/JsonServerApi"
import { UserContext } from "../components/UserContextProvider"
import { NavLink, useLoaderData, useNavigate } from "react-router-dom"

const notesLoader = async ({ params: { id } }) => {
	const jsonServerApi = new JsonServerApi()
	const notes = await jsonServerApi.getNotes(id)
	return { notes }
}

function Notes() {
	const { notes } = useLoaderData()
	const navigator = useNavigate()
	const { user } = useContext(UserContext)

	const handleDeleteNote = async (note) => {
		const jsonServerApi = new JsonServerApi()
		await jsonServerApi.deleteNote(user.id, note)
		navigator(`/user/${user.id}/notes`)
	}

	return (
		<div className='max-w-2xl mx-auto text-center'>
			<div className='text-4xl font-bold mb-4'>Notes</div>
			<NavLink
				to='/createnote'
				className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline mb-4 inline-block'
			>
				Add new note
			</NavLink>
			{notes
				.sort((a, b) => b.created - a.created)
				.map((note) => (
					<div
						key={note.id}
						className='border p-4 mb-4 flex flex-wrap items-center justify-between'
					>
						<div className='w-full sm:w-3/4'>
							<NavLink
								to={`/viewnote/${note.id}`}
								className='text-xl font-bold mb-2 break-words'
							>
								{note.name}
							</NavLink>
							<br />
							<NavLink to={`/viewnote/${note.id}`}>
								{note.created}
							</NavLink>
						</div>
						<div className='flex items-center sm:w-1/4 sm:justify-end mt-4 sm:mt-0'>
							<NavLink
								to={`/redactnote/${note.id}`}
								className='text-blue-500 mr-4'
							>
								<span role='img'>✍️</span>{" "}
							</NavLink>
							<button
								onClick={() => handleDeleteNote(note)}
								className='text-red-500'
							>
								<span role='img'>🗑️</span>{" "}
							</button>
						</div>
					</div>
				))}
		</div>
	)
}

export { Notes, notesLoader }
