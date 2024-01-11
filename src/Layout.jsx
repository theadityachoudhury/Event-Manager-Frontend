import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { useUserContext } from "./UserContext";
import Loader from "./pages/components/Loader";

export default function Layout() {
	const { user, ready, authenticated } = useUserContext();
	const callbackurl = window.location.pathname;

	if (!ready) {
		return <Loader title="Loading" />;
	} else {
		if (!authenticated && !user) {
			console.log(callbackurl);
			return <Navigate to={"/login?callback=" + callbackurl} />;
		} else {
			if (!user.data.verified) {
				return <Navigate to={"/verify?callback=" + callbackurl} />;
			} else {
				if (!user.data.face) {
					return <Navigate to={"/face?callback=" + callbackurl} />;
				} else {
					return (
						<>
							<Header isPublic={false} />
							{authenticated && user && ready && user.data.verified && (
								<Outlet />
							)}
						</>
					);
				}
			}
		}
	}
}
