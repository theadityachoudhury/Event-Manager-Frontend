import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [authenticated, setAuthenticated] = useState(
		Cookies.get("authenticated") === "true" || false
	);

	const [user, setUser] = useState(
		Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
	);
	const [ready, setReady] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (Cookies.get("authenticated") === undefined) {
			Cookies.set("authenticated", "false");
		}
	}, []);

	const fetchUser = async () => {
		try {
			const response = await axios.get("/api/auth/user");
			if (response.data === null) {
				setUser(null);
			} else {
				setUser(response.data.data);
			}
			setError(null);
		} catch (error) {
			console.error(error);
			setError("Failed to fetch user data");
		} finally {
			setReady(true);
		}
	};

	const refreshAccessToken = async () => {
		try {
			await axios.get("/api/auth/refresh");
			await fetchUser();
		} catch (error) {
			console.error(error);
			setError("Failed to refresh access token");
		}
	};

	useEffect(() => {
		const initializeUser = async () => {
			if (authenticated) {
				try {
					await fetchUser();
					if (user === null) {
						await refreshAccessToken();
					}
				} catch (error) {
					console.error(error);
					setError("Failed to initialize user data");
				} finally {
					setReady(true);
				}
			}
			setReady(true);
		};

		initializeUser();

		// Set up the refreshAccessTokenInterval only when authenticated
		let refreshAccessTokenInterval;
		if (authenticated) {
			refreshAccessTokenInterval = setInterval(
				refreshAccessToken,
				5 * 60 * 60 * 1000
				// 10*1000
			);
		}

		// Clean up the interval when the component unmounts or when user is not authenticated
		return () => {
			clearInterval(refreshAccessTokenInterval);
		};
	}, [authenticated]);

	const login = (backendTokens) => {
		console.log(backendTokens);
		setAuthenticated(true);
		Cookies.set("accessToken", backendTokens.token, {
			secure: true,
			sameSite: true,
			expires: new Date(Date.now() + backendTokens.expiresIn * 1000),
		});
		Cookies.set("refreshAccessToken", backendTokens.refreshToken);
		Cookies.set("authenticated", "true", { expires: 7 }); // Set cookie to expire in 7 days
	};

	const logout = () => {
		setAuthenticated(false);
		setUser(null);
		Cookies.remove("authenticated");
		Cookies.remove("user");
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				ready,
				setReady,
				error,
				authenticated,
				login,
				logout,
			}}>
			{children}
		</UserContext.Provider>
	);
}

// Helper hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
