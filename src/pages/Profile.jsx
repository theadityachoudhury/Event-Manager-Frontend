import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Settings = ({ title }) => {
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
							<h1 className="h1-bold">Settings</h1>
							<div className="grid grid-cols-2 mt-5">
								<div className="grid grid-rows-1 gap-5 bg-slate-500 grid-">
									<Link>One</Link>
									<Link>One</Link>
									<Link>One</Link>
									<Link>One</Link>
								</div>
								<div className="bg-red-500">
									<p>Content</p>
									
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Settings;
