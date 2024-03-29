import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Settings = ({ title }) => {
	const location = useLocation();
	const subPages = [{"name": "Profile", "route": "/profile" },{"name": "Registered Events", "route": "/profile/registered"}, {"name": "Attended Events", "route": "/profile/attended"}]
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
					<section className=" py-5 md:py-10">
						<div className="wrapper">
							<h1 className="h1-bold">Profile Section</h1>
							<div className="space-x-3 mt-12 text-center">
								{subPages.map((page) => {
									console.log(page);
									console.log(location.pathname);
									const isActive = location.pathname === page.route;
									const activeClass = isActive ? "bg-indigo-400 text-white" : "bg-gray-300 text-black";
									return <Link
										to={page.route}
										key={page.name}
										className={`${activeClass} rounded-xl p-2 text-xl hover:bg-red-400 transition ease-in`}>
										{page.name}
									</Link>
								})}
							</div>


						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Settings;
