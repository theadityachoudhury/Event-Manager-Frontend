import React, { useState, useEffect } from "react";
import axios from "axios";

const EmailLogsTable = ({ user }) => {
	const [emailLogs, setEmailLogs] = useState([]);

	useEffect(() => {
		const fetchEmailLogs = async () => {
			try {
				const response = await axios.get("/api/pr/email");
				setEmailLogs(response.data);
			} catch (error) {
				console.error("Error fetching email logs:", error);
			}
		};

		fetchEmailLogs();
	}, [user]);

	return (
		<div className="overflow-x-auto">
			<h2 className="text-2xl font-semibold mb-4">Email Logs</h2>
			<table className="w-full border-collapse">
				<thead>
					<tr>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							To
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Subject
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Body
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Status
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Type
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Message ID
						</th>
						<th className="border-b-2 border-gray-200 p-2 bg-gray-100 text-left">
							Timestamp
						</th>
					</tr>
				</thead>
				<tbody>
					{emailLogs.map((log, index) => (
						<tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
							<td className="border-b border-gray-200 p-2">
								{log.to.join(", ")}
							</td>
							<td className="border-b border-gray-200 p-2">{log.subject}</td>
							<td className="border-b border-gray-200 p-2">{log.body}</td>
							<td className="border-b border-gray-200 p-2">{log.status}</td>
							<td className="border-b border-gray-200 p-2">{log.type}</td>
							<td className="border-b border-gray-200 p-2">{log.messageId}</td>
							<td className="border-b border-gray-200 p-2">
								{new Date(log.createdAt).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EmailLogsTable;
