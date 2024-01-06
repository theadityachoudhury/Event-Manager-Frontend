import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { UserContextProvider } from "./UserContext";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import axios from "axios";
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
				<Route path="/login" element={<Login />} />
				<Route path="/verify" element={<Verify />} />

				<Route index element={<Home />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
