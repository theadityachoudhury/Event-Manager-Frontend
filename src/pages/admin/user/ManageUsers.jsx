import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Navigate } from "react-router-dom";

const ManageUsers = () => {
	const { user } = useUserContext();
	const [notAdmin, setNotAdmin] = useState(false);
	useEffect(() => {
		if (user.data.role != "admin") {
			setNotAdmin(true);
		}
	}, [user]);
	if (notAdmin) {
		return <Navigate to="/dashboard" />;
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
                                        <th className="border p-2">Mobile</th>
                                        <th className="border p-2">Role</th>
										<th className="border p-2">Verified</th>
                                        
                                        
									</tr>
								</thead>
								{/* <tbody>
									{users.map((userdata) => (
										<tr key={userdata._id} className="text-center">
											<td className="border p-2">
												<input
													onChange={() =>
														handleCheckboxChange(userdata.userId._id)
													}
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
								</tbody> */}
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ManageUsers;
