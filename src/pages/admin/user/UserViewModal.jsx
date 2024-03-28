import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserViewModal = ({ id }) => {
	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState(null);
	const [updatedData, setUpdatedData] = useState(null);
	const getUserInfo = async () => {
		const config = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			maxBodyLength: "Infinity",
			url: `/api/auth/admin/getUserInfo/${id}`,
		};
		try {
			const { data } = await axios.request(config);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	};

	const getData = () => {
		if (!data)
			getUserInfo()
				.then((data) => {
					setData(data);
				})
				.catch((error) => {
					console.error(error);
					toast.error("Failed to fetch user data");
				});
	};
	return (
		<div>
			<button
				className="text-white bg-indigo-400 hover:bg-indigo-500 rounded-md p-1"
				onClick={async () => {
					setShowModal(!showModal);
					getData();
				}}>
				View
      </button>
      
      {showModal && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white text-black p-4 rounded-md shadow-md px-6">
						<div className="flex justify-between mb-4 gap-5">
							<h2 className="text-lg font-semibold">View User</h2>
							<button
								className="text-sm text-gray-600 hover:text-gray-800"
								onClick={() => {
									setShowModal(false)
									setData(null)
								}}>
								Close
							</button>
						</div>
						{showModal && !data && (
							<div className="space-y-4 text-left max-w-sm md:max-w-lg animate-bounce">
								Loading...
							</div>
						)}
						{showModal && data && (
							<form className="space-y-4 text-left max-w-md md:min-w-[400px]">
								<div className="">
									<label htmlFor="email" className="block mb-1">
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={data.email}
										onChange={(e) => {
											setUpdatedData({ ...updatedData, email: e.target.value });
											setData({ ...data, email: e.target.value });
										}}
										className="w-full px-3 py-2 border rounded-md"
										disabled
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
										value={data.name}
										onChange={(e) => {
											setUpdatedData({ ...updatedData, name: e.target.value });
											setData({ ...data, name: e.target.value });
										}}
										className="w-full px-3 py-2 border rounded-md"
										disabled

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
										value={data.verified}
										onChange={(e) => {
											setUpdatedData({
												...updatedData,
												verified: e.target.value == "true" ? true : false,
											});
											setData({
												...data,
												verified: e.target.value == "true" ? true : false,
											});
										}}
										disabled
										className="w-full px-3 py-2 border rounded-md">
										<option value={true}>True</option>
										<option value={false}>False</option>
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
										value={data.face ? "TRUE" : "FALSE"}
										onChange={(e) => {
											setUpdatedData({ ...updatedData, face: e.target.value });
											setData({ ...data, face: e.target.value });
										}}
										className="w-full px-3 py-2 border rounded-md"
										disabled
									/>
								</div>
								<div className="">
									<label htmlFor="deleted" className="block mb-1">
										Deleted
									</label>
									<select
										type="text"
										id="deleted"
										name="deleted"
										value={data.deleted}
										onChange={(e) => {
											setUpdatedData({
												...updatedData,
												deleted: e.target.value == "true" ? true : false,
											});
											setData({
												...data,
												deleted: e.target.value == "true" ? true : false,
											});
										}}
										disabled
										className="w-full px-3 py-2 border rounded-md">
										<option value={true}>True</option>
										<option value={false}>False</option>
									</select>
								</div>
							</form>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserViewModal;
