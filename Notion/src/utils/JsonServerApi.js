export default class JsonServerApi {
	#baseUrl = "http://localhost:5001"

	async getUser(userId) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/users/${userId}`
			).then((response) => response.json())
			return response
		} catch (error) {
			console.error("Error fetching user:", error)
			throw error
		}
	}

	async createUser(userData) {
		try {
			const response = await fetch(`${this.#baseUrl}/users`, {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}).then((response) => response.json())
			return response
		} catch (error) {
			console.error("Error creating user:", error)
			throw error
		}
	}

	async createNote(userId, noteData) {
		try {
			const response = await fetch(`${this.#baseUrl}/notes`, {
				method: "POST",
				body: JSON.stringify(noteData),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}).then((response) => response.json())
			return response
		} catch (error) {
			console.error("Error creating note:", error)
			throw error
		}
	}

	async deleteNote(userId, note) {
		try {
			const a = await fetch(`${this.#baseUrl}/notes/${note.id}`, {
				method: "DELETE",
			})
		} catch (error) {
			console.error("Error deleting note:", error)
			throw error
		}
	}

	async editNote(updatedNoteData) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/notes/${updatedNoteData.id}`,
				{
					method: "PATCH",
					body: JSON.stringify(updatedNoteData),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			).then((response) => response.json())
			console.log(response)
			return response
		} catch (error) {
			console.error("Error editing note:", error)
			throw error
		}
	}

	async getNote(noteId) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/notes/${noteId}`
			).then((response) => response.json())
			return response
		} catch (error) {
			console.error("Error fetching note:", error)
			throw error
		}
	}

	async getNotes(userId) {
		try {
			const response = await fetch(
				`${this.#baseUrl}/notes?authorId=${userId}`
			).then((response) => response.json())
			return response
		} catch (error) {
			console.error("Error fetching notes:", error)
			throw error
		}
	}
}
