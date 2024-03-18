import React, { useState } from "react";

const UserEditModal = ({ id }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<div>
				<button
					className="text-white bg-black rounded-md p-1"
					onClick={() => {
						setShowModal(!showModal);
					}}>
					Edit
				</button>
			</div>

			{showModal && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white text-black p-4 rounded-md shadow-md w-3/12">
						<div className="flex justify-self-center mb-4">
							<h2 className="text-lg font-semibold">Edit User</h2>
							<button
								className="text-sm text-gray-600 hover:text-gray-800"
								onClick={() => setShowModal(false)}>
								Close
							</button>
						</div>
						<form className="w-full max-w md:max-w-lg">
							<div className="mb-4">
								<label htmlFor="username" className="block mb-1">
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									className="w-full px-3 py-2 border rounded-md"
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="block mb-1">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full px-3 py-2 border rounded-md"
								/>
							</div>
							{/* Add more form fields as needed */}
							<div className="text-right">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserEditModal;
