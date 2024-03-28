import React, { useEffect, useState } from "react";
import EventsCard from "./EventsCard";
import { useSearchParams } from "react-router-dom";
import Footer from "../../Footer";

const Events = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts

		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, []);
	const [params, setParams] = useSearchParams();
	const [searchData, setSearchData] = useState(params.get("query") || "");
	const [query, setQuery] = useState({
		query: params.get("query") || "",
		page: params.get("page") || 1,
		perPage: params.get("perPage") || 10,
	});
	const handleSearchSubmit = async (e) => {
		// e.preventDefault();
		setQuery(searchData);
	};
	return (
		<div className="wrapper">
			<div className="wrapper">
				<h1 className="h1-bold">Explore All Events</h1>
			</div>
			<div className="wrapper mt-5">
				<form onSubmit={handleSearchSubmit} className="flex gap-3">
					<input
						type="text"
						name="query"
						id="query"
						value={searchData}
						onChange={(e) => {
							setSearchData(e.target.value);
						}}
						autoComplete="off"
						placeholder="Search Event Here"
						className="w-full ring ring-black rounded-md p-3 px-5 focus:ring-slate-900"
					/>
					<button
						type="submit"
						className="bg-black rounded-md p-3 text-white hover:bg-slate-800">
						Search
					</button>
				</form>
			</div>

			<div className="flex-center">
				<EventsCard
					data={query.query}
					page={query.page}
					perPage={query.perPage}
				/>
			</div>
			<div><Footer /></div>
		</div>
	);
};

export default Events;
