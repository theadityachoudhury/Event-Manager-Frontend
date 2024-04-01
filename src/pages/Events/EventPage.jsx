import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../../UserContext";
import { MoveLeft } from "lucide-react";
import ManageBar from "./admin/ManageBar";
import Footer from "../../Footer";

const EventPage = () => {
	const today = new Date().toISOString();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({});
	const [iserror, setError] = useState(false);
	const [isApplied, setIsApplied] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	const [edit, setEdit] = useState(false);
	const [eventDelete, setEventDelete] = useState(false);
	const [attendance, setAttendance] = useState(false);
	const [closed, setClosed] = useState(false);

	console.log(closed);
	if (!id) {
		return <Navigate to="/explore" />;
	}
	useEffect(() => {
		// Update the document title when the component mounts
		if (eventData.eventName) {
			document.title = eventData.eventName + " | Evently";
		} else {
			document.title = "Evently";
		}

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [eventData]);

	useEffect(() => {
		setLoading(true);
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/event/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.request(config)
			.then(({ data }) => {
				setEventData(data);
				if (new Date(data.eventStartDate) < new Date(today)) {
					setClosed(true);
				}
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
			});

		if (user) {
			if (user.data.role != "admin") {
				config = {
					method: "get",
					maxBodyLength: Infinity,
					url: `/api/event/isApplied/${id}`,
					headers: {
						"Content-Type": "application/json",
					},
				};
				axios
					.request(config)
					.then(({ data }) => {
						setIsApplied(true);
						toast.success("Event already applied!!");
					})
					.catch((err) => {
						setIsApplied(false);
						toast.error("Event not registered!!");
					});
			}
		}
	}, []);

	const registerEvent = async () => {
		try {
			let config = {
				method: "post",
				maxBodyLength: Infinity,
				url: `/api/event/apply/${id}`,
				headers: {
					"Content-Type": "application/json",
				},
				data: { amountToBePaid: eventData.price },
			};
			const { data } = await axios.request(config);
			setIsApplied(true);
			toast.success("Successfully Applied Event!!");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error?.response?.status == 404)
					toast.error("Data Missing in request!");
				else if (error?.response?.status == 401)
					toast.error("No associated event found");
				else if (error?.response?.status == 406)
					toast.error("Participants Exceeded");
				else if (error?.response?.status == 409)
					toast.error("Already Registered!");
				else if (error?.response?.status == 500)
					toast.error("Internal Server Error!! Please try again later!!");
				else if (error?.message === "Network Error") {
					console.log("Unable to contact servers! Please try again later");
					toast.error("Unable to contact servers! Please try again later", {
						style: {
							border: "1px solid",
							padding: "16px",
							color: "#fa776c",
						},
						iconTheme: {
							primary: "#fa776c",
							secondary: "#FFFAEE",
						},
					});
				}
			}
		}
	};
	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}
	const editEvent = async () => {
		setEdit(true);
	};
	const [confirmDelete, setConfirmDelete] = useState(false);
	const deleteEvent = async () => {
		setConfirmDelete(true);
	};
	const [deleteNav, setDeleteNav] = useState(false);
	const handleDelete = async () => {
		try {
			if (confirmDelete) {
				await axios.delete(`/api/event/${id}`);
				toast.success("Delete Successful!!");
				setDeleteNav(true);
			} else {
				toast.error("Invalid Function!!");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error?.response?.status == 404)
					toast.error("Data Missing in request!");
				else if (error?.response?.status == 500)
					toast.error("Internal Server Error!! Please try again later!!");
				else if (error?.message === "Network Error") {
					console.log("Unable to contact servers! Please try again later");
					toast.error("Unable to contact servers! Please try again later", {
						style: {
							border: "1px solid",
							padding: "16px",
							color: "#fa776c",
						},
						iconTheme: {
							primary: "#fa776c",
							secondary: "#FFFAEE",
						},
					});
				}
			}
		}
	};

	const handleCancel = async () => {
		setConfirmDelete(false);
	};

	const markAttendance = async () => {
		setAttendance(true);
	};

	const [participants, setViewParticipants] = useState(false);
	const viewParticipants = async () => {
		setViewParticipants(true);
	};
	const payForEvent = async () => {
		try {
			const res = await loadScript(
				"https://checkout.razorpay.com/v1/checkout.js"
			);

			if (!res) {
				alert("Razorpay SDK failed to load. Are you online?");
				return;
			}
			let config = {
				method: "post",
				maxBodyLength: Infinity,
				url: `/api/payments/${id}`,
				headers: {
					"Content-Type": "application/json",
				},
				data: { amountToBePaid: eventData.price },
			};

			const { data } = await axios.request(config);
			const options = {
				key: "rzp_test_TYl2fF7oUQ9ZEL",
				currency: data.currency,
				amount: data.amount.toString(),
				order_id: data.order_id,
				name: "Evently Pvt. Ltd.",
				description: `Payment for registration for ${eventData.eventName}`,
				image: "https://evently.adityachoudhury.com/assets/images/logo.svg",
				handler: function (response) {
					toast.success("Payment Successful");
					setIsApplied(true);
				},
				prefill: {
					name: user.data.name,
					email: user.data.email,
				},
				notes: {
					address: "Evently Pvt. Ltd.",
				},
				theme: {
					color: "#3399cc",
				},
			};

			const paymentObject = new window.Razorpay(options);
			// console.log(paymentObject);
			paymentObject.open();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error?.response?.status == 404)
					toast.error("Data Missing in request!");
				else if (error?.response?.status == 400)
					toast.error("No associated event found");
				else if (error?.response?.status == 400)
					toast.error("Already Registered!");
				else if (error?.response?.status == 500)
					toast.error("Internal Server Error!! Please try again later!!");
				else if (error?.message === "Network Error") {
					console.log("Unable to contact servers! Please try again later");
					toast.error("Unable to contact servers! Please try again later", {
						style: {
							border: "1px solid",
							padding: "16px",
							color: "#fa776c",
						},
						iconTheme: {
							primary: "#fa776c",
							secondary: "#FFFAEE",
						},
					});
				}
			}
		}
	};

	if (iserror) {
		return <Navigate to="/404" />;
	}

	if (loading) {
		return <Loader />;
	}

	if (edit) {
		return <Navigate to={`/event/edit/${id}`} />;
	}
	if (attendance) {
		return <Navigate to={`/event/mark/${id}`} />;
	}
	if (participants) {
		return <Navigate to={`/event/participants/${id}`} />;
	}
	if (deleteNav) {
		return <Navigate to={`/explore`} />;
	}

	if (!loading && !iserror && eventData)
		return (
			<div className={`wrapper space-y-5`}>
				<div className="">
					<Link to="/explore">
						<p className="flex gap-2">
							<MoveLeft />
							Back to Explore Page
						</p>
					</Link>
				</div>
				<div className="sm:grid sm:grid-cols-3 gap-5">
					<div className="space-y-2 sm:col-span-2">
						<div className="">
							<h1 className="h1-bold">{eventData.eventName}</h1>
						</div>
						{authenticated &&
							user &&
							ready &&
							(user.data.role == "admin" ||
								user.data._id == eventData.ownerId) && (
								<div>
									<ManageBar
										edit={editEvent}
										mark={markAttendance}
										deleteEvent={deleteEvent}
										viewParticipants={viewParticipants}
									/>
								</div>
							)}

						<div className="flex gap-2">
							<p className="bg-black text-white p-2 rounded-md w-min">
								{eventData.eventCategory?.categoryName}
							</p>
							<p className="p-2">
								{`${new Date(eventData.eventStartDate || 0).getDate()}/${
									new Date(eventData.eventStartDate || 0).getMonth() + 1
								}/${new Date(eventData.eventStartDate || 0).getFullYear()}`}
							</p>
						</div>
						<div className="block sm:hidden">
							<img
								src="/assets/images/test-image.avif"
								alt="hero"
								width={1000}
								height={1000}
								className="mt-5 max-h-[70vh] object-contain object-center md:max-h-full rounded-lg"
							/>
						</div>
						<div className="text-xl font-semibold">
							<p>Location:- {eventData.eventLocation}</p>
						</div>
						<div className="text-xl font-medium">
							<p>Price:- ${eventData.price}/-</p>
						</div>
						<div className="text-xl font-medium">
							<p>
								Participation Limit:- {eventData.eventParticipationLimit}{" "}
								Persons
							</p>
						</div>
						<div>
							<p className="mb-10">{eventData.eventDescription}</p>
						</div>
						{!authenticated && ready && (
							<div className="flex justify-center items-center sm:justify-start sm:items-start ">
								<Link
									className="bg-indigo-400 text-2xl rounded-md p-3 hover:bg-red-400"
									to={`/login?callback=/event/${id}`}>
									<button className="">Login To Continue</button>
								</Link>
							</div>
						)}

						{authenticated && ready && user && eventData && (
							<div>
								{eventData.ownerId == user.data._id ||
								user.data.role == "admin" ? (
									<></>
								) : !closed || isApplied ? (
									<div>
										{eventData.free === true || eventData.price == 0 ? (
											<div className="flex justify-center items-center sm:justify-start sm:items-start ">
												<button
													disabled={isApplied}
													onClick={registerEvent}
													className="bg-indigo-400 text-2xl rounded-md p-3 hover:bg-red-400">
													{isApplied ? "Registered" : "Register Now"}
												</button>
											</div>
										) : (
											<div className="flex justify-center items-center sm:justify-start sm:items-start ">
												<button
													onClick={payForEvent}
													disabled={isApplied}
													className="bg-indigo-400 text-2xl rounded-md p-3 hover:bg-red-400">
													{isApplied
														? "Paid & Registered"
														: `Pay ${eventData.price}/-`}
												</button>
											</div>
										)}
									</div>
								) : (
									<div className="flex justify-center items-center sm:justify-start sm:items-start ">
										<button
											disabled={true}
											className="bg-indigo-400 text-2xl rounded-md p-3 hover:bg-red-400 disabled:bg-slate-400 disabled:text-slate-950 disabled:hover:bg-slate-500">
											Registrations Closed
										</button>
									</div>
								)}
							</div>
						)}
						<div className="mt-2 font-medium">
							<p className="mt-10">
								Event Posted On:-{" "}
								{`${new Date(eventData.createdAt || 0).getDate()}/${
									new Date(eventData.createdAt || 0).getMonth() + 1
								}/${new Date(eventData.createdAt || 0).getFullYear()}`}
								{console.log(eventData.createdAt)}
								{console.log(
									`${new Date(eventData.createdAt || 0).getDate()}/${new Date(
										eventData.createdAt || 0
									).getMonth()}/${new Date(
										eventData.createdAt || 0
									).getFullYear()}`
								)}
							</p>
							<p className="">
								Event Last Updated On:-{" "}
								{`${new Date(eventData.updatedAt || 0).getDate()}/${
									new Date(eventData.updatedAt || 0).getMonth() + 1
								}/${new Date(eventData.updatedAt || 0).getFullYear()}`}
							</p>
						</div>
					</div>
					<div>
						<img
							src="/assets/images/test-image.avif"
							alt="hero"
							width={1000}
							height={1000}
							className="hidden sm:block max-h-[70vh] object-contain object-center md:max-h-full rounded-md"
						/>
					</div>
				</div>
				{confirmDelete && ( // Render confirmation modal if confirmDelete is true
					<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-slate-100 text-black p-4 rounded-md shadow-md">
							<p>Are you sure you want to delete this event?</p>
							<div className="mt-4 flex justify-center space-x-5">
								<button
									onClick={handleCancel}
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2">
									Delete
								</button>
							</div>
						</div>
					</div>
				)}

				<Footer />
			</div>
		);
};

export default EventPage;
