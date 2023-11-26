import { useContext, useState } from "react"
import { UserContext } from "../components/UserContextProvider"
import { NavLink, useNavigate } from "react-router-dom"
import JsonServerApi from "../utils/JsonServerApi"

export default function CreateNote() {
	const [noteName, setNoteName] = useState("")
	const [noteContent, setNoteContent] = useState("")
	const { user } = useContext(UserContext)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleCreateNote = async () => {
		if (noteName.trim()) {
			const jsonServerApi = new JsonServerApi()
			await jsonServerApi.createNote(user.id, {
				created: new Date().toLocaleString(),
				authorId: user.id,
				name: noteName.trim(),
				text: noteContent,
			})
			navigate(`/user/${user.id}/notes`)
		} else {
			setError("У заметки должно быть имя")
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

			<h2 className='text-2xl font-bold mb-4'>Create Note</h2>
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
				onClick={handleCreateNote}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Create
			</button>
		</div>
	)
}

