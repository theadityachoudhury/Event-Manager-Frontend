import React, { useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import EventsCard from "./Events/EventsCard";
import { MoveRight } from "lucide-react";

const Home = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	return (
		<>
			<div className="flex h-screen flex-col">
				<main className="flex-1 bg-dotted-pattern bg-contain">
					<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
						<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
							<div className="flex flex-col justify-center gap-8">
								<h1 className="h1-bold">
									Host, Connect, Celebrate: Your Events, Our Platform!
								</h1>
								<p className="p-regular-20 md:p-regular-24">
									Create event today and enjoy the hassle free management
									process of attendance or sharing pictures with the
									participants. Weather it be formal or informal events. We got
									you covered.
								</p>
								<Link to="/explore">
									<button className="text-white max-w-max bg-indigo-600 hover:bg-red-400 font-medium rounded-full text-xl px-5 py-4  dark:bg-indigo-600 dark:hover:bg-red-400 focus:outline-none">
										Explore Now
									</button>
								</Link>
							</div>

							<img
								src="/assets/images/hero.png"
								alt="hero"
								width={1000}
								height={1000}
								className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
							/>
						</div>
					</section>

					<section id="events" className="wrapper">
						<h2 className="h2-bold">
							Trust by <br /> Thousands of Events
						</h2>

						<div className="sm:grid sm:grid-cols-2 mt-6">
							<p className="text-4xl text-center sm:text-left sm:text-2xl font-medium">Explore Events</p>
							<Link to="/explore" className="justify-center flex gap-2 text-xl sm:justify-end mt-1">
								View All Events <MoveRight />
							</Link>
						</div>

						<div className="wrapper flex w-full flex-col gap-5 md:flex-row">
							<EventsCard data="" perPage={3} />
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default Home;
