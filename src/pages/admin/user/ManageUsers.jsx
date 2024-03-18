import React, { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const ManageUsers = () => {
	const { user } = useUserContext();
	const [notAdmin, setNotAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const getAllUserData = async () => {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/auth/admin/getAllUsers`,
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const { data } = await axios.request(config);
			return data;
		} catch (error) {
			console.log(error);
			throw new Error("Unauthorized");
		}
	};

	const cachedUserData = useMemo(async () => {
		setLoading(true);
		try {
			const data = await getAllUserData();
			setLoading(false);
			return data;
		} catch (error) {
			console.log(error);
			setNotAdmin(true);
			toast.error("Unauthorized!!");
			setLoading(false);
			return [];
		}
	}, [user]);
	useEffect(() => {
		if (user.data.role !== "admin") {
			setNotAdmin(true);
		} else {
			cachedUserData.then((data) => {
				setUsers(data);
			})
		}
	}, [user,users]);
	console.log(users);
	if (notAdmin) {
		return <Navigate to="/dashboard" />;
	}
	if (loading) {
		return <Loader />;
	}
	return (
		<div className="wrapper">
			<section className="space-x-3">
				<h1 className="h1-bold">Manage Users</h1>
			</section>
			<section>
				<div className="">
					<div className="container mx-auto mt-8">
						<h1 className="text-3xl font-semibold mb-4">Event Attendance</h1>

						<div className="overflow-x-auto">
							<table className="min-w-full border rounded-lg">
								<thead>
									<tr className="bg-gray-200">
										<th className="border p-2">Name</th>
										<th className="border p-2">Email</th>
										<th className="border p-2">Role</th>
										<th className="border p-2">Verified</th>
										<th className="border p-2">Face</th>
										<th className="border p-2">Actions</th>
									</tr>
								</thead>
								<tbody>
									{users.length!=0 ? (
										users.map((userdata) => (
											<tr key={userdata._id} className="text-center">
												<td className="border p-2">{userdata.name}</td>
												<td className="border p-2">{userdata.email}</td>
												<td className="border p-2">{userdata.role}</td>
												<td className="border p-2">
													{userdata.verified ? "True" : "False"}
												</td>
												<td className="border p-2">
													{userdata.face ? "True" : "False"}
												</td>
												<td className="border p-2 space-x-2">
													<button className="text-white bg-green-700 hover:bg-green-900 p-1 rounded-md">
														Edit
													</button>
													<button className="text-white bg-blue-700 hover:bg-blue-900 p-1 rounded-md">
														View
													</button>
													<button className="text-white bg-red-700 hover:bg-red-900 p-1 rounded-md">
														Delete
													</button>
												</td>
											</tr>
										))
									) : (
										<Loader />
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ManageUsers;
