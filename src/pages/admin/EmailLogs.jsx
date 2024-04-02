import React from "react";
import { useUserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";
import EmailLogsTable from "./EmailLogsTable";

const EmailLogs = () => {
	const { user } = useUserContext();
	if (user.data.role !== "admin") return <Navigate to="/dashboard" />;
	return (
		<div className="m-5">
			<EmailLogsTable user={user} />
		</div>
	);
};

export default EmailLogs;
