import React, { useEffect } from "react";
import Footer from "../Footer";

const About = ({ title }) => {
	const teamMembers = [{
		imageSrc: "/assets/team/aditya10.JPG",
		name: "Aditya Singh",
		id: "2129010",
		role: "UI Designer",
	}, {
		imageSrc: "/assets/team/aditya11.jpg",
		name: "Aditya Choudhury",
		id: "2129011",
		role: "Full Stack Dev",
	}, {
		imageSrc: "/assets/team/adwaith.jpg",
		name: "Adwaith PJ",
		id: "2129013",
		role: "ML Dev",
	}, {
		imageSrc: "/assets/team/diptangshu.jpg",
		name: "Diptangshu Bhattacharjee",
		id: "2129023",
		role: "Investor",
	}, {
		imageSrc: "/assets/team/megha.jpg",
		name: "MeghaVarshini Nukam",
		id: "2129154",
		role: "Backend Dev",
	}]
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
							<ul className="md:text-xl text-md space-y-2 sm:flex sm:gap-4 stroke-gray-500">
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
							<h1 className="text-center text-4xl font-semibold mb-6">
								Our Team Members
							</h1>
							<div className="flex flex-wrap justify-center gap-10">
								{teamMembers.map((member) => (
									<div className="flex flex-col items-center" key={member.id}>
										<img
											src={member.imageSrc}
											alt={member.name}
											className="rounded-full h-40 w-40 mb-4"
										/>
										<p className="font-medium">{member.name}</p>
										<p className="text-sm">{member.id}</p>
										<p className="text-sm">{member.role}</p>
									</div>
								))}
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
