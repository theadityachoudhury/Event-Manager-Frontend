import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import { useUserContext } from "./UserContext";
import Loader from "./pages/components/Loader";

export default function Layout() {
  const { user, ready } = useUserContext();
  console.log(ready, user);
  if (!ready) {
    return <Loader />;
  }
  if (!user && ready) {
    const callbackurl = window.location.pathname;
    console.log(callbackurl);
    return <Navigate to={"/login?callback=" + callbackurl} />;
  }
  if (user && ready && !user.verified) {
    const callbackurl = window.location.pathname;
    console.log(callbackurl);
    return <Navigate to={"/verify?callback=" + callbackurl} />;
  }
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 p-4">
      <Header />
      {user && ready && user.verified && <Outlet />}
    </div>
  );
}
