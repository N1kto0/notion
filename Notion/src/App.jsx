import RegistrationForm from "./routes/RegistrationForm"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginForm from "./routes/LoginForm"
import UserContextProvider from "./components/UserContextProvider"
import Home from "./routes/Home"
import RequireAuth from "./components/RequireAuth"
import Layout from "./routes/Layout"
import { Notes, notesLoader } from "./routes/Notes"
import CreateNote from "./routes/CreateNote"
import { RedactNote, noteLoader } from "./routes/RedactNote"
import NotFound from "./routes/NotFound"
import { ViewNote } from "./routes/ViewNote"

const router = createBrowserRouter([
	{
		path: "*",
		element: <NotFound></NotFound>,
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
	{
		path: "/registration",
		element: <RegistrationForm></RegistrationForm>,
	},
	{
		path: "/",
		element: (
			<RequireAuth>
				<Layout></Layout>
			</RequireAuth>
		),
		children: [
			{
				path: "/home",
				element: <Home></Home>,
			},
			{
				path: "/user/:id/notes",
				element: <Notes></Notes>,
				loader: notesLoader,
				errorElement: <NotFound></NotFound>,
			},
			{
				path: "/viewnote/:id",
				element: <ViewNote></ViewNote>,
				loader: noteLoader,
				errorElement: <NotFound></NotFound>,
			},
		],
	},
	{
		path: "/createnote",
		element: (
			<RequireAuth>
				<CreateNote></CreateNote>
			</RequireAuth>
		),
	},
	{
		path: "/redactnote/:id",
		element: (
			<RequireAuth>
				<RedactNote></RedactNote>
			</RequireAuth>
		),
		errorElement: <NotFound></NotFound>,
		loader: noteLoader,
	},
])

function App() {
	return (
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	)
}

export default App
