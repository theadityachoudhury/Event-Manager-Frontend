import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";

const Attended = () => {
	const [attendedEvents, setAttendedEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchData = async () => {
		try {
			const { data } = await axios.get("/api/event/get/attendedEvents");
			setAttendedEvents(data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <Loader />;
	}
	return (
		<div className="relative overflow-x-auto">
			<table className="min-w-full table-auto">
				<thead className="bg-gray-200">
					<tr>
						<th className="px-4 py-2">Event Name</th>
						<th className="px-4 py-2">Event Location</th>
						<th className="px-4 py-2">Event Start Date</th>
						<th className="px-4 py-2">Attended</th>
						<th className="px-4 py-2">Registered At</th>
					</tr>
				</thead>
				<tbody>
					{attendedEvents?.map((event) => (
						<tr key={event._id} className="border-b text-center">
							<td className="px-4 py-2">{event.eventId.eventName}</td>
							<td className="px-4 py-2">{event.eventId.eventLocation}</td>
							<td className="px-4 py-2">
								{new Date(event.eventId.eventStartDate).toLocaleString()}
							</td>
							<td className="px-4 py-2">{event.attended ? "Yes" : "No"}</td>
							<td className="px-4 py-2">
								{new Date(event.createdAt).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{attendedEvents?.length === 0 && (
				<div className="text-center">No Data Found!!</div>
			)}
		</div>
	);
};

export default Attended;
