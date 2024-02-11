import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const EventPage = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState({});
	const [iserror, setError] = useState(false);
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
		
	}, []);

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
							{eventData?.eventDescription}. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Nam congue nibh a malesuada viverra.
							Nunc consequat augue quam, ut imperdiet nulla consequat a.
							Suspendisse fermentum lectus mi, vitae vestibulum lacus aliquet
							ac. Aliquam odio ex, maximus eget gravida ut, interdum ut tortor.
						</p>
					</div>

					<div className="flex justify-center items-center sm:justify-start sm:items-start ">
						<Link className="bg-indigo-400 text-2xl rounded-md p-3 hover:bg-red-400">
							<button className="">Register Now</button>
						</Link>
					</div>

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
