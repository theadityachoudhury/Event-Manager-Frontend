import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import axios from "axios";
import Loader from "../../components/Loader";
import InternalServerError from "../../components/InternalServerError";
import { Navigate, useParams } from "react-router-dom";

const ViewParticipantsList = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [iserror, setError] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	const [eventData, setEventData] = useState([]);
	useEffect(() => {
		setLoading(true);
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/event/registeredUsers/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.request(config)
			.then(({ data }) => {
				setEventData(data);
			})
			.catch((err) => {
				setError(true);
			});
		setLoading(false);
	}, []);

	if (loading) {
		return <Loader />;
	}
	if (iserror) {
		return (
			<InternalServerError
				errMsg="You are not authorized"
				errDesc="If this is an error!! Please contact the administrator!!"
			/>
		);
	}
	if (user.data.role != "admin") {
		if (eventData.ownerId) {
			if (eventData.ownerId != user.data._id) {
				return <Navigate to={`/event/${id}`} />;
			}
		}
	}
	return (
		<div className="wrapper space-y-3">
			<div className="">
				<h1 className="h1-bold">{eventData.eventName} Participation List</h1>
			</div>
			<div>
				<table className="min-w-full border rounded-lg">
					<thead>
						<tr className="bg-gray-200">
							<th className="border p-2">Name</th>
							<th className="border p-2">Email</th>
							<th className="border p-2 ">Verified</th>
							<th className="border p-2 ">Face</th>
							<th className="border p-2 ">Attended</th>
							<th className="border p-2 ">Registered On</th>
						</tr>
					</thead>
					<tbody>
						{eventData.map((userdata) => (
							<tr key={userdata._id} className="text-center">
								<td className="border p-2">{userdata.userId.name}</td>
								<td className="border p-2">{userdata.userId.email}</td>
								<td className="border p-2">
									{userdata.userId.verified ? "True" : "False"}
								</td>
								<td className="border p-2">
									{userdata.userId.face ? "True" : "False"}
								</td>
								<td className="border p-2">
									{userdata.attended ? "True" : "False"}
								</td>
								<td className="border p-2">{userdata.createdAt}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ViewParticipantsList;
