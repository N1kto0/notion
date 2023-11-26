import { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvider"
import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import JsonServerApi from "../utils/JsonServerApi"

const noteLoader = async ({ params: { id } }) => {
	const jsonServerApi = new JsonServerApi()
	const note = await jsonServerApi.getNote(id)
	return { note }
}

function RedactNote() {
	const { note } = useLoaderData()
	const { user } = useContext(UserContext)
	const [noteName, setNoteName] = useState(note.name)
	const [noteContent, setNoteContent] = useState(note.text)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleRedactNote = async () => {
		if (noteName.trim()) {
			const jsonServerApi = new JsonServerApi()
			await jsonServerApi.editNote({
				...note,
				name: noteName.trim(),
				text: noteContent,
			})
			navigate(`/user/${user.id}/notes`)
		} else {
			setError(
				"У заметки должно быть имя (имя не может состоять только из пробелов)"
			)
		}
	}

	return (
		<div className='flex flex-col items-center'>
			<NavLink
				to={`/user/${user.id}/notes`}
				className='bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline mt-4 mb-4'
			>
				Go to Notes
			</NavLink>

			<h2 className='text-2xl font-bold mb-4'>Edit Note</h2>
			{error && (
				<p className='text-red-500 text-sm mb-4'>
					<strong>Error:</strong> {error}
				</p>
			)}
			<input
				type='text'
				value={noteName}
				onChange={(e) => setNoteName(e.target.value)}
				placeholder='Name'
				className='border border-gray-300 px-4 py-2 mb-4 bg-gray-100 w-full sm:w-96'
			/>
			<textarea
				value={noteContent}
				onChange={(e) => setNoteContent(e.target.value)}
				placeholder='Content'
				className='border border-gray-300 px-4 py-2 mb-4 bg-gray-100 w-full sm:w-96'
			/>
			<button
				onClick={handleRedactNote}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Save
			</button>
		</div>
	)
}

export { RedactNote, noteLoader }
