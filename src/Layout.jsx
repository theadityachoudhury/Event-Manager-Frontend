import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { useUserContext } from "./UserContext";
import Loader from "./pages/components/Loader";

export default function Layout() {
	const { user, ready } = useUserContext();
	if (!ready) {
		return <Loader title="Loading" />;
	}
	if (!user && ready) {
		const callbackurl = window.location.pathname;
		console.log(callbackurl);
		return <Navigate to={"/login?callback=" + callbackurl} />;
	}
	if (user && ready && !user.data.verified) {
		const callbackurl = window.location.pathname;
		console.log(callbackurl);
		return <Navigate to={"/verify?callback=" + callbackurl} />;
	}
	return (
		<>
			<Header isPublic={false} />
			{user && ready && user.data.verified && <Outlet />}
		</>
	);
}
