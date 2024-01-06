import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { UserContextProvider } from "./UserContext";
import Login from "./pages/Login";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
