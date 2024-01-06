import axios from "axios";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Layout from "./Layout";
import {
	About,
	Contact,
	Dashboard,
	Events,
	Home,
	Login,
	Register,
	Verify,
} from "./pages";

const baseURL =
	window.location.hostname === "evently.adityachoudhury.com"
		? "https://backend.evently.adityachoudhury.com"
		: "http://localhost:5000";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/events" element={<Events />} />
				</Route>
				<Route path="/verify" element={<Verify />} />
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
