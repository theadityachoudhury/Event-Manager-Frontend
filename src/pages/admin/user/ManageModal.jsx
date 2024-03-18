import React from "react";
import UserViewModal from "./UserViewModal";
import UserEditModal from "./UserEditModal";
import UserDeleteModal from "./UserDeleteModal";

const ManageModal = ({ id }) => {
	return (
		<div className="flex space-x-1">
			<UserViewModal id={id} />
			<UserEditModal id={id} />
			<UserDeleteModal id={id} />
		</div>
	);
};

export default ManageModal;
