import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";
import Loader from "./components/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const Dashboard = ({ title }) => {
	const [todaysEvents, setTodaysEvents] = useState([]);
	const [tomorrowsEvents, setTomorrowsEvents] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [pastEvents, setPastEvents] = useState([]);

	const [loading, setLoading] = useState(true);
	const { user } = useUserContext();

	const fetchEvents = async () => {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/event/createdByMe`,
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.request(config);
			setTodaysEvents(data.today);
			setTomorrowsEvents(data.tomorrow);
			setUpcomingEvents(data.upcoming);
			setPastEvents(data.past);

			setLoading(false);
		} catch (error) {
			console.log(error);
			throw new Error("Unauthorized");
		}
	};
	useEffect(() => {
		fetchEvents()
			.then(() => toast.success("Data Fetch Successful"))
			.catch((error) => toast.error(error.message));
	}, []);

	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	if (loading) {
		return <Loader />;
	}
	return (
		<div className="wrapper space-y-5">
			<div>
				<h1 className="text-3xl font-medium">
					{user.data.name.split(" ")[0]}'s, Event Dashboard
				</h1>
			</div>

			{/* Todays Events */}
			<div className="space-y-2 rounded-md bg-slate-100 p-5">
				<h1 className="text-2xl">Today's Events</h1>
				{todaysEvents && todaysEvents.length > 0 ? (
					<div className="mx-auto mt-8">
						<div className="overflow-x-auto">
							<table className="min-w-full border rounded-lg">
								<thead>
									<tr className="bg-black text-white">
										<th className="border p-2">Event Name</th>
										<th className="border p-2">Category</th>
										<th className="border p-2">Location</th>
										<th className="border p-2">Attendance</th>
										<th className="border p-2">Participants</th>
										<th className="border p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{todaysEvents.map((event) => (
										<tr key={event._id} className="text-center">
											<td className="border p-2">{event.eventName}
												<span
													className={
														(event.eventType == "open"
															? "bg-indigo-100 text-indigo-950"
															: "bg-red-100 text-red-950") +
														"rounded-md p-1 ml-2 text-xs"
													}>
													{event.eventType == "open" ? "PUBLIC" : "PRIVATE"}
												</span></td>
											<td className="border p-2">
												{event.eventCategory.categoryName}
											</td>
											<td className="border p-2">{event.eventLocation}</td>
											<td className="border p-2">
												{event.eventAttendanceRequired
													? "Required"
													: "Optional"}
											</td>
											<td className="border p-2">{event.participantsCount}</td>
											<td className="border p-2 space-x-2">
												<Link to={`/event/${event._id}`}>
													<button className="btn btn-primary hover:text-blue-700">
														Manage
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-2xl font-semibold">No events today</div>
				)}
			</div>

			{/* Tomorrows Events */}
			<div className="space-y-2 rounded-md bg-slate-100 p-5">
				<h1 className="text-2xl">Tomorrow's Events</h1>
				{tomorrowsEvents && tomorrowsEvents.length > 0 ? (
					<div className="mx-auto mt-8">
						<div className="overflow-x-auto">
							<table className="min-w-full border rounded-lg">
								<thead>
									<tr className="bg-black text-white">
										<th className="border p-2">Event Name</th>
										<th className="border p-2">Category</th>
										<th className="border p-2">Location</th>
										<th className="border p-2">Attendance</th>
										<th className="border p-2">Participants</th>
										<th className="border p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{tomorrowsEvents.map((event) => (
										<tr key={event._id} className="text-center">
											<td className="border p-2">{event.eventName}
												<span
													className={
														(event.eventType == "open"
															? "bg-indigo-100 text-indigo-950"
															: "bg-red-100 text-red-950") +
														"rounded-md p-1 ml-2 text-xs"
													}>
													{event.eventType == "open" ? "PUBLIC" : "PRIVATE"}
												</span></td>
											<td className="border p-2">
												{event.eventCategory.categoryName}
											</td>
											<td className="border p-2">{event.eventLocation}</td>
											<td className="border p-2">
												{event.eventAttendanceRequired
													? "Required"
													: "Optional"}
											</td>
											<td className="border p-2">{event.participantsCount}</td>
											<td className="border p-2 space-x-2">
												<Link to={`/event/${event._id}`}>
													<button className="btn btn-primary hover:text-blue-700">
														Manage
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-2xl font-semibold">No events tomorrow</div>
				)}
			</div>

			{/* Upcoming Events */}
			<div className="space-y-2 rounded-md bg-slate-100 p-5">
				<h1 className="text-2xl">Upcoming Events</h1>
				{upcomingEvents && upcomingEvents.length > 0 ? (
					<div className="mx-auto mt-8">
						<div className="overflow-x-auto">
							<table className="min-w-full border rounded-lg">
								<thead>
									<tr className="bg-black text-white">
										<th className="border p-2">Event Name</th>
										<th className="border p-2">Category</th>
										<th className="border p-2">Location</th>
										<th className="border p-2">Attendance</th>
										<th className="border p-2">Participants</th>
										<th className="border p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{upcomingEvents.map((event) => (
										<tr key={event._id} className="text-center">
											<td className="border p-2">{event.eventName}
												<span
													className={
														(event.eventType == "open"
															? "bg-indigo-100 text-indigo-950"
															: "bg-red-100 text-red-950") +
														"rounded-md p-1 ml-2 text-xs"
													}>
													{event.eventType == "open" ? "PUBLIC" : "PRIVATE"}
												</span></td>
											<td className="border p-2">
												{event.eventCategory.categoryName}
											</td>
											<td className="border p-2">{event.eventLocation}</td>
											<td className="border p-2">
												{event.eventAttendanceRequired
													? "Required"
													: "Optional"}
											</td>
											<td className="border p-2">{event.participantsCount}</td>
											<td className="border p-2 space-x-2">
												<Link to={`/event/${event._id}`}>
													<button className="btn btn-primary hover:text-blue-700">
														Manage
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-2xl font-semibold">No upcoming events</div>
				)}
			</div>

			{/* Past Events */}
			<div className="space-y-2 rounded-md bg-slate-100 p-5">
				<h1 className="text-2xl">Past Events</h1>
				{pastEvents && pastEvents.length > 0 ? (
					<div className="mx-auto mt-8">
						<div className="overflow-x-auto">
							<table className="min-w-full border rounded-lg">
								<thead>
									<tr className="bg-black text-white">
										<th className="border p-2">Event Name</th>
										<th className="border p-2">Category</th>
										<th className="border p-2">Location</th>
										<th className="border p-2">Attendance</th>
										<th className="border p-2">Participants</th>
										<th className="border p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{pastEvents.map((event) => (
										<tr key={event._id} className="text-center">
											<td className="border p-2 mr-2">
												{event.eventName}
												<span
													className={
														(event.eventType == "open"
															? "bg-indigo-100 text-indigo-950"
															: "bg-red-100 text-red-950") +
														"rounded-md p-1 ml-2 text-xs"
													}>
													{event.eventType == "open" ? "PUBLIC" : "PRIVATE"}
												</span>
											</td>
											<td className="border p-2">
												{event.eventCategory.categoryName}
											</td>
											<td className="border p-2">{event.eventLocation}</td>
											<td className="border p-2">
												{event.eventAttendanceRequired
													? "Required"
													: "Optional"}
											</td>
											<td className="border p-2">{event.participantsCount}</td>
											<td className="border p-2 space-x-2">
												<Link to={`/event/${event._id}`}>
													<button className="btn btn-primary hover:text-blue-700">
														Manage
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-2xl font-semibold">No past events</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
