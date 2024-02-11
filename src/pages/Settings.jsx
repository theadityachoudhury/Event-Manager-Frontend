import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";

const Settings = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	const { user, logout } = useUserContext();
	return (
		<>
			<div className="flex h-screen flex-col">
				<main className="flex-1">
					<section className=" py-5 md:py-10">
						<div className="wrapper">
							<div className="flex">
								<svg
									className="sm:block hidden"
									xmlns="http://www.w3.org/2000/svg"
									width="90"
									height="90"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-user">
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
									<circle cx="12" cy="7" r="4" />
								</svg>
								<div>
									{" "}
									<p className="text-3xl">{user.data.name}</p>
									<div className="">
										<p className="text-lg text-slate-600">{user.data.email}</p>
										<p className="text-sm">
											{" "}
											Not You? <Link onClick={logout}>Logout</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="py-5 md:py-10">
						<div className="wrapper">
							<form className="text-2xl">
								<div className="flex gap-2">
									<label htmlFor="name">Name</label>
									<input className="border rounded-md pl-2" type="text" placeholder={user.data.name} />
								</div>
							</form>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Settings;
