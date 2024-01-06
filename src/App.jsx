import axios from "axios";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Home from "./Components/Home";

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
				<Route path="/" index element={<Home />} />
			</Routes>
		</UserContextProvider>
	);
}

export default App;
