import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import InternalServerError from "../../components/InternalServerError";
import toast from "react-hot-toast";
import { MoveLeft } from "lucide-react";

const MarkAttendance = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [iserror, setError] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	const [eventData, setEventData] = useState();
	const [notAllowed, setNotAllowed] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/event/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.request(config)
			.then(({ data }) => {
				setEventData(data);
				let config = {
					method: "get",
					maxBodyLength: Infinity,
					url: `/api/event/getAttendance/${id}`,
					headers: {
						"Content-Type": "application/json",
					},
				};

				axios
					.request(config)
					.then(({ data }) => {
						setUsers(data);
					})
					.catch((err) => {
						if (axios.isAxiosError(err)) {
							if (
								err?.response?.status == 404 ||
								err?.response?.status == 400
							) {
								toast.error("Event Not Fount");
								setError(true);
							} else if (err?.response?.status == 403) {
								toast.error("Unauthorized to access this!!");
							} else if (err?.response?.status == 500) {
								toast.error("Internal Server Error!!");
							} else if (err?.response?.status == 405) {
								toast.error("Attendance not allowed!!");
								setNotAllowed(true);
							}
						}
					});

				setLoading(false);
			})
			.catch((err) => {
				setError(true);
				setLoading(false);
			});
	}, []);

	const handleCheckboxChange = (userId) => {
		const updatedUsers = users.map((user) =>
			user.userId._id === userId ? { ...user, attended: !user.attended } : user
		);
		setUsers(updatedUsers);
	};

	const handleSaveAttendance = async () => {
		try {
			await axios.post(`/api/event/mark/${id}`, { users });
			toast.success("Attendance data updated successfully");
		} catch (error) {
			toast.error("Error updating attendance data:", error);
		}
	};

	if (loading) {
		return <Loader />;
	}
	if (
		!loading &&
		eventData &&
		(user.data._id != eventData.ownerId || user.data.role != "admin")
	) {
		return <Navigate to={`/event/${id}`} />;
	}
	if (iserror) {
		return <Navigate to="/404" />;
	}

	if (notAllowed) {
		return (
			<div className="wrapper">
				<InternalServerError
					errMsg="Attendance Not Allowed"
					errDesc="Please enable attendance and try again!!"
				/>
				<div className="">
					<Link to={`/event/${id}`}>
						<p className="flex gap-2 text-center justify-center">
							<MoveLeft />
							Back to Event Page
						</p>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="">
			<div className="container mx-auto mt-8">
				<div className="">
					<Link to={`/event/${id}`}>
						<p className="flex gap-2">
							<MoveLeft />
							Back to Event Page
						</p>
					</Link>
				</div>
				<h1 className="text-3xl font-semibold mb-4">Event Attendance</h1>

				<div className="overflow-x-auto">
					<table className="min-w-full border rounded-lg">
						<thead>
							<tr className="bg-gray-200">
								<th className="border p-2">Attended</th>
								<th className="border p-2">Email</th>
								<th className="border p-2 hidden sm:block">Name</th>
							</tr>
						</thead>
						<tbody>
							{users.map((userdata) => (
								<tr key={userdata._id} className="text-center">
									<td className="border p-2">
										<input
											onChange={() => handleCheckboxChange(userdata.userId._id)}
											type="checkbox"
											checked={userdata.attended}
											className="mx-auto h-6 w-6 rounded-full text-blue-500 border border-blue-500 shadow"
										/>
									</td>
									<td className="border p-2">{userdata.userId.email}</td>
									<td className="border p-2 hidden sm:block">
										{userdata.userId.name}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="wrapper">
					<button
						onClick={handleSaveAttendance}
						className="mt-4 bg-blue-500 hover-bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
						Save Attendance
					</button>
				</div>
			</div>
		</div>
	);
};

export default MarkAttendance;
