import React, { useEffect } from "react";
import Footer from "../Footer";

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
							<h1 className="text-3xl md:text-5xl font-semibold md:font-bold md:my-10 md:text-nowrap indent-">
								Spark Your Event's Story with Evently! ✨
							</h1>
							<p className="md:text-2xl text-lg font-medium my-8">
								Evently is not just another event management platform; it's a
								comprehensive SaaS product designed to make your events truly
								unforgettable. Whether it's a grand wedding celebration or a
								cozy family gathering, Evently has you covered with a range of
								features:
							</p>
							<ul className="md:text-xl text-md space-y-2 flex gap-4 stroke-gray-500">
								<li className="bg-indigo-400 hover:bg-red-400 transition ease-in-out duration-300 p-3 rounded-md">
									<strong>Automatic Event Image Distribution:</strong> Every
									attendee receives their event photos!
								</li>
								<li className="bg-indigo-400 hover:bg-red-400 transition ease-in-out duration-300 p-3 rounded-md">
									<strong>Attendance Marker:</strong> Keep track of participants
									effortlessly.
								</li>
								<li className="bg-indigo-400 hover:bg-red-400 transition ease-in-out duration-300 p-3 rounded-md">
									<strong>Free or Paid Events:</strong> Customize your event
									pricing.
								</li>
								<li className="bg-indigo-400 hover:bg-red-400 transition ease-in-out duration-300 p-3 rounded-md">
									<strong>Open or Close Events:</strong> Choose the level of
									privacy for your gatherings.
								</li>
								<li className="bg-indigo-400 p-3 hover:bg-red-400 transition ease-in-out duration-300 rounded-md">
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
						<div className="mt-9">
							<h1 className="text-center text-4xl font-semibold">Our Team Members</h1>
							<div className="sm:flex flex-row m-5 gap-28 items-center justify-center content-center text-center">
								<div className="">
									<img
										src="/assets/team/aditya10.JPG"
										alt=""
										className="rounded-full h-40 w-40"
									/>
									<p>Aditya Singh</p>
									<p>2129010</p>
									<p>UI Designer</p>
								</div>
								<div className="">
									<img
										src="/assets/team/aditya11.jpg"
										alt=""
										className="rounded-full h-40 w-40"
									/>
									<p>Aditya Choudhury</p>
									<p>2129011</p>
									<p>Full Stack Dev</p>

								</div>
								<div className="">
									<img
										src="/assets/team/adwaith.jpg"
										alt=""
										className="rounded-full h-40 w-40"
									/>
									<p>Adwaith PJ</p>
									<p>2129013</p>
									<p>ML Dev</p>

								</div>
								<div className="">
									<img
										src="/assets/team/diptangshu.jpg"
										alt=""
										className="rounded-full h-40 w-40"
									/>
									<p>Diptangshu<br/>Bhattacharjee</p>
									<p>2129023</p>
									<p>Investor</p>

								</div>
								<div className="">
									<img
										src="/assets/team/megha.jpg"
										alt=""
										className="rounded-full h-40 w-40"
									/>
									<p>MeghaVarshini<br/>Nukam</p>
									<p>2129154</p>
									<p>Backend Dev</p>

								</div>
							</div>
						</div>
					</section>
					<Footer />
				</main>
			</div>
		</>
	);
};

export default About;
