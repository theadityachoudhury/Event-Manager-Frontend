import React, { useEffect } from "react";
import EventsCard from "./EventsCard";

const Events = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	const handleSearchSubmit = async () => {};
	return (
		<div className="wrapper">
			<div>
				<h1 className="h1-bold">Explore All Events</h1>
			</div>
			<div className="mt-5">
				<form onSubmit={handleSearchSubmit} className="flex gap-3">
					<input
						type="text"
						name="search-item"
						id="search-item"
						autoComplete="off"
						placeholder="Search Event Here"
						className="w-full ring ring-black rounded-md p-3 px-5 focus:ring-slate-900"
					/>
					<button className="bg-black rounded-md p-3 text-white hover:bg-slate-800">
						Search
					</button>
				</form>
			</div>

			<div className="mt-5">
				<EventsCard />
			</div>
		</div>
	);
};

export default Events;
