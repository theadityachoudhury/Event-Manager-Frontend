import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./components/Profile/UserProfile";
import Registered from "./components/Profile/Registered";
import Attended from "./components/Profile/Attended";

const Settings = ({ title }) => {
	const location = useLocation();
	const subPages = [
		{ name: "Profile", route: "/profile" },
		{ name: "Registered Events", route: "/profile/registered" },
		{ name: "Attended Events", route: "/profile/attended" },
	];
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	return (
		<>
			<div className="flex h-screen flex-col">
				<main className="flex-1">
					<section className="py-5 md:py-10">
						<div className="wrapper mx-auto px-4 sm:px-6 lg:px-8">
							<h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
								Profile Section
							</h1>
							<div className="space-x-3 mt-12 text-center">
								{subPages.map((page) => {
									console.log(page);
									console.log(location.pathname);
									const isActive = location.pathname === page.route;
									const activeClass = isActive
										? "bg-indigo-400 text-white"
										: "bg-gray-300 text-black";
									return (
										<Link
											to={page.route}
											key={page.name}
											className={`${activeClass} inline-block rounded-xl p-2 text-xl hover:bg-red-400 transition ease-in mt-2 sm:mt-0`}>
											{page.name}
										</Link>
									);
								})}
							</div>
							<div className="mt-10">
								{location.pathname === "/profile" && <UserProfile />}
								{location.pathname === "/profile/registered" && <Registered />}
								{location.pathname === "/profile/attended" && <Attended />}
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Settings;
