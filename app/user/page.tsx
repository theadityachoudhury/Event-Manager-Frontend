"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const UserProfile: React.FC = async () => {
	let response: any;
	const session = getServerSession(authOptions);
	console.log("Session:- ",session );
	// let config = {
	// 	method: "get",
	// 	maxBodyLength: Infinity,
	// 	url: "http://localhost:5000/api/auth/user",
	// 	headers: {
	// 		Authorization: `Bearer ${session?.backendTokens.accessToken}`,
	// 	},
	// };

	// try {
	// 	response = await axios.request(config);
	// 	console.log("Response:" + response.data);
	// } catch (error) {
	// 	console.log(error);
	// }

	return (
		<div>
			<h1>User Profile</h1>
			{/* {response ? (
				<div>
					<p>Name: {response?.data?.name}</p>
					<p>Email: {response?.data?.email}</p>
					<p>Role: {response?.data?.role}</p>
					{/* Add more details if needed */}
			{/* </div> */}
			{/* // ) : ( */}
			{/* <div>Loading...</div> */}
			{/* // )} */}
		</div>
	);
};

export default UserProfile;
