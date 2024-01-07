import React, { useEffect } from "react";
import Header from "../Header";

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
				<main className="flex-1">
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
								<button size="lg" className="button w-full sm:w-fit">
									<a href="#events">Explore Now</a>
								</button>
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

					<section
						id="events"
						className="wrapper my-8 flex flex-col gap-8 md:gap-12">
						<h2 className="h2-bold">
							Trust by <br /> Thousands of Events
						</h2>

						{/* <div className="flex w-full flex-col gap-5 md:flex-row">
		<Search />
		<CategoryFilter />
	</div> */}
					</section>
				</main>
			</div>
		</>
	);
};

export default Home;
