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
								maxWidth: "800px",
								textAlign: "center",
							}}>
							<h1
								style={{
									fontSize: "2.5rem",
									fontWeight: "bold",
									marginBottom: "1rem",
								}}>
								Welcome to Evently - Your Ultimate Event Management Solution!
							</h1>
							<p
								style={{
									fontSize: "1.6rem",
									margin: "2rem 0",
								}}>
								Evently is not just another event management platform; it's a
								comprehensive SaaS product designed to make your events truly
								unforgettable. Whether it's a grand wedding celebration or a
								cozy family gathering, Evently has you covered with a range of
								features:
							</p>
							<ul
								style={{
									fontSize: "1.4rem",
									textAlign: "left",
									paddingLeft: "1.5rem",
									marginBottom: "1rem",
								}}>
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
									marginTop: "0.5rem",
								}}>
								Join Evently today and experience seamless event planning and
								management. Create memorable moments without the stress, because
								with Evently, your events are in good hands!
							</p>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default About;
