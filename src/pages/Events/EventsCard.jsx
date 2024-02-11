import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const EventsCard = () => {
	const [loading, setLoading] = useState(true);
	const [eventData, setEventData] = useState([]);
	useEffect(() => {
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: "/api/event",
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
				// setLoading(false);
				toast.error("Unabele to fetch data");
			});
	}, []);
	console.log(loading);
	if (loading) {
		return <Loader />;
	}
	return (
		// <div className="">
		// 	<div>
		// 		<p className="font-bold">{eventData.results.length} Results Found</p>
		// 	</div>

		// 	{eventData.results.map((data) => {
		// 		return (
		// 			<div className="mt-5">
		// 				<div className="border border-black rounded-md p-5">
		// 					<div className="wrapper grid grid-cols-1 gap-2 md:grid-cols-2 2xl:gap-2">
		// 						<img
		// 							src="/assets/images/hero.png"
		// 							alt="hero"
		// 							width={300}
		// 							height={300}
		// 							className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] md:max-h-full"
		// 						/>
		// 						<div className="space-y-3 text-left">
		// 							<p className="text-4xl font-bold text-center sm:text-left">
		// 								{data.eventName}
		// 							</p>
		// 							<p className="text-xl">{data.eventDescription}</p>
		// 							<p className="text-xl text-wrap">Category - {data.eventCategory}</p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		);
		// 	})}
		// </div>

		<div className="wrapper">
			<div>
				<p className="font-bold">{eventData.results.length} Results Found</p>
			</div>
			<div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
				{eventData.results.map((data) => {
					return (
						<Link
							key={data._id}
							className="rounded-md mt-2 p-2"
							to={`/events/${data._id}`}>
							<div key={data._id} className="w-fit sm:max-w-[300px]">
								<div className="mt-5">
									<img
										src="/assets/images/test-image.avif"
										alt="hero"
										width={300}
										height={300}
										className="max-h-[70vh] object-contain object-center md:max-h-full rounded-md"
									/>
									<div className="space-y-1 mt-3">
										<p className="text-2xl sm:text-4xl font-bold sm:text-left">
											{data.eventName}
										</p>
										<p className="sm:text-xl text-wrap">
											{data.eventCategory.categoryName}
										</p>
										<p className="sm:text-xl text-wrap">{data.eventLocation}</p>
										<p className="sm:text-xl text-wrap">
											Price:- ${data.free ? "Free" : data.price}
										</p>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default EventsCard;
