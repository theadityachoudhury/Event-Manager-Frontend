"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import makeRequest from "@/hooks/Request";

interface UserData {
	_id: string;
	name: string;
	email: string;
	role: string;
	verified: boolean;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const UserProfile: React.FC = () => {
	const [userData, setUserData] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await axios.get<{ data: UserData }>(
				// 	"https://events-backend.adityachoudhury.com/api/auth/user"
				// );
				const response = await makeRequest({
					data: "",
					url: "/api/auth/user",
					type: "GET",
				});
				console.log(response);
				setUserData(response.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures the effect runs only once on mount

	return (
		<div>
			<h1>User Profile</h1>
			{userData ? (
				<div>
					<p>Name: {userData.name}</p>
					<p>Email: {userData.email}</p>
					<p>Role: {userData.role}</p>
					{/* Add more details if needed */}
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	);
};

export default UserProfile;
