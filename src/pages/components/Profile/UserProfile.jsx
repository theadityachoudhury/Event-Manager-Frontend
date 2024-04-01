import React from "react";
import { useUserContext } from "../../../UserContext";

const UserProfile = () => {
	const { user } = useUserContext();
	return (
		<div className="relative space-y-5 bg-slate-100 p-4 rounded-md">
			{[
				{ label: "Id", value: user.data._id },
				{ label: "Name", value: user.data.name },
				{ label: "Email", value: user.data.email },
				{ label: "Role", value: user.data.role },
				{ label: "Verified", value: user.data.verified ? "True" : "False" },
				{ label: "Face", value: user.data.face ? "True" : "False" },
				{ label: "Deleted", value: user.data.deleted ? "True" : "False" },
				{ label: "Account Created On", value: user.data.createdAt },
				{ label: "Account Last Updated On", value: user.data.updatedAt },
			].map((item) => (
				<div key={item.label} className="flex flex-col sm:flex-row">
					<div className="text-lg sm:text-2xl p-2 sm:w-1/3">{item.label}:-</div>
					<div className="text-lg sm:text-2xl bg-slate-200 rounded-md p-2 sm:w-2/3">
						{item.value}
					</div>
				</div>
			))}
		</div>
	);
};

export default UserProfile;
