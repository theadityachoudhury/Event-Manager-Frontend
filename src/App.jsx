import axios from "axios";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Layout from "./Layout";
import Dashboard from "./pages/dash";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Login from "./Pages/Login";

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
				</Route>
				<Route path="/verify" element={<Verify />} />
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
