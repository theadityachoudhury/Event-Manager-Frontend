import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [authenticated, setAuthenticated] = useState(
		Cookies.get("authenticated") === "true" || false
	);

	const [user, setUser] = useState(null);
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
				setAuthenticated(false);
			} else {
				setUser({ ...response.data });
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
			const response = await axios.get("/api/auth/refresh");
			Cookies.set("accessToken", response.data.token, {
				secure: true,
				sameSite: true,
				expires: new Date(Date.now() + response.data.expiresIn * 1000),
			});
			Cookies.set("authenticated", "true", { expires: 7 }); // Set cookie to expire in 7 daysF
			await fetchUser();
		} catch (error) {
			console.error(error);
			setError("Failed to refresh access token");
			logout();
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
				50 * 1000
				// 5 * 60 * 60 * 1000
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
	const verify = () => {
		setUser({ ...user, verified: true });
		fetchUser();
	};

	const logout = async () => {
		try {
			let config = {
				method: "POST",
				maxBodyLength: Infinity,
				url: "/api/auth/logout",
				headers: {},
			};
			const response = await axios.request(config);
		} catch (error) {
			console.log(error);
		}
		setAuthenticated(false);
		setUser(null);
		Cookies.remove("token");
		Cookies.remove("accessToken");
		Cookies.remove("refreshToken");
		Cookies.set("authenticated", "false");
		Cookies.remove("refreshAccessToken");
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
				verify,
			}}>
			{children}
		</UserContext.Provider>
	);
}

// Helper hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
