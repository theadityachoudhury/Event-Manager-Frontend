import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const UserEditModal = ({ id }) => {
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {});

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
						<div className="flex justify-between mb-4">
							<h2 className="text-lg font-semibold">Edit User</h2>
							<button
								className="text-sm text-gray-600 hover:text-gray-800"
								onClick={() => setShowModal(false)}>
								Close
							</button>
						</div>
						<form className="space-y-4 text-left w-full max-w-sm md:max-w-lg">
							<div className="">
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
							<div className="">
								<label htmlFor="name" className="block mb-1">
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full px-3 py-2 border rounded-md"
								/>
							</div>
							<div className="">
								<label htmlFor="verified" className="block mb-1">
									Verified
								</label>
								<select
									type="text"
									id="verified"
									name="verified"
									className="w-full px-3 py-2 border rounded-md">
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
							</div>
							<div className="">
								<label htmlFor="face" className="block mb-1">
									Face
								</label>
								<input
									type="text"
									id="face"
									name="face"
									className="w-full px-3 py-2 border rounded-md"
									value="TRUE"
									disabled
								/>
							</div>
							<div className="">
								<label htmlFor="deleted" className="block mb-1">
									Deketed
								</label>
								<select
									type="text"
									id="deleted"
									name="deleted"
									className="w-full px-3 py-2 border rounded-md">
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
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
