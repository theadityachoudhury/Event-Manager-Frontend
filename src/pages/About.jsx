import React, { useEffect } from "react";

const About = ({ title }) => {
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
			<div
				style={{
					display: "flex",
					height: "100vh",
				}}>
				<main style={{ flex: 1 }}>
					<section
						
						style={{
							padding: "2rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<div
							
							style={{
								maxWidth: "900px",
								textAlign: "center",
							}}>
							<h1
								className="text-3xl md:text-5xl font-semibold md:font-bold md:my-10 md:text-nowrap indent-"
								>
								 Spark Your Event's Story with Evently! ✨
							</h1>
							<p
								className="md:text-2xl text-lg font-medium my-8"
								>
								Evently is not just another event management platform; it's a
								comprehensive SaaS product designed to make your events truly
								unforgettable. Whether it's a grand wedding celebration or a
								cozy family gathering, Evently has you covered with a range of
								features:
							</p>
							<ul
								className="md:text-xl text-md space-y-2"
								>
								<li>
									<strong>Automatic Event Image Distribution:</strong> Every
									attendee receives their event photos!
								</li>
								<li>
									<strong>Attendance Marker:</strong> Keep track of participants
									effortlessly.
								</li>
								<li>
									<strong>Free or Paid Events:</strong> Customize your event
									pricing.
								</li>
								<li>
									<strong>Open or Close Events:</strong> Choose the level of
									privacy for your gatherings.
								</li>
								<li>
									<strong>Perfect for any Occasion:</strong> From weddings to
									corporate events, we cater to all.
								</li>
							</ul>
							<p
								style={{
									fontSize: "1.2rem", // Adjusted font size for smaller devices
									marginTop: "2rem",
								}}>
								Join Evently today and experience seamless event planning and
								management. Create memorable moments without the stress, because
								with Evently, your events are in good hands!
							</p>
						</div>
						<button className="mt-10 text-white bg-indigo-600 hover:bg-red-400 font-medium rounded-full text-md md:text-xl px-5 py-2.5 me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-red-400 focus:outline-none transition ease-in-out duration-300">
							Join Now
						</button>
					</section>
				</main>
			</div>
		</>
	);
};

export default About;
