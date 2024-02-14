import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserContext } from "../../UserContext";

const EventPage = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({});
	const [iserror, setError] = useState(false);
	const [isApplied, setIsApplied] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	if (!id) {
		return <Navigate to="/explore" />;
	}

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
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
			});

		if (user) {
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
	}, [isApplied]);

	const registerEvent = async () => {};
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
				handler: function (response) {
					console.log(response);
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

	if (!loading && !iserror && eventData)
		return (
			<div className="wrapper sm:grid sm:grid-cols-3 gap-5">
				<div className="space-y-2 sm:col-span-2">
					<div className="">
						<h1 className="h1-bold">{eventData.eventName}</h1>
					</div>
					<div className="flex gap-2">
						<p className="bg-black text-white p-2 rounded-md w-min">
							{eventData.eventCategory?.categoryName}
						</p>
						<p className="p-2">
							{`${new Date(eventData.eventStartDate || 0).getDate()}/${new Date(
								eventData.eventStartDate || 0
							).getMonth()}/${new Date(
								eventData.eventStartDate || 0
							).getFullYear()}`}
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
							Participation Limit:- {eventData.eventParticipationLimit} Persons
						</p>
					</div>
					<div>
						<p className="mb-10">
							{eventData.eventDescription}. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nam congue nibh a malesuada viverra.
							Nunc consequat augue quam, ut imperdiet nulla consequat a.
							Suspendisse fermentum lectus mi, vitae vestibulum lacus aliquet
							ac. Aliquam odio ex, maximus eget gravida ut, interdum ut tortor.
						</p>
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

					{authenticated && ready && user && (
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
					)}
					<div className="mt-2 font-medium">
						<p className="mt-10">
							Event Posted On:-{" "}
							{`${new Date(eventData.createdAt || 0).getDate()}/${new Date(
								eventData.createdAt || 0
							).getMonth()}/${new Date(
								eventData.createdAt || 0
							).getFullYear()}`}
						</p>
						<p className="">
							Event Last Updated On:-{" "}
							{`${new Date(eventData.updatedAt || 0).getDate()}/${new Date(
								eventData.updatedAt || 0
							).getMonth()}/${new Date(
								eventData.updatedAt || 0
							).getFullYear()}`}
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
		);
};

export default EventPage;
