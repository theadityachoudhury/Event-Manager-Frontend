import React from "react";

const ManageBar = ({ edit, deleteEvent, mark,viewParticipants }) => {
	return (
		<div className="space-x-2 space-y-2">
			<button
				onClick={edit}
				className="bg-black text-white rounded-md px-3 py-2 hover:bg-slate-800">
				Edit
			</button>
			<button
				onClick={mark}
				className="bg-indigo-500 text-white rounded-md px-3 py-2 hover:bg-indigo-700">
				Mark Attendance
			</button>
			<button
				onClick={deleteEvent}
				className="bg-red-600 text-white rounded-md px-3 py-2 hover:bg-red-500">
				Delete Event
			</button>
			<button
				onClick={viewParticipants}
				className="bg-indigo-600 text-white rounded-md px-3 py-2 hover:bg-red-500">
				Participants List
			</button>
		</div>
	);
};

export default ManageBar;
