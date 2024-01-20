import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";

const ContactLogs = () => {
	const [contactData, setContactData] = useState([]);
	const [loading, isLoading] = useState(true);
	useEffect(() => {
		axios
			.get("/api/pr/contact")
			.then((response) => {
				setContactData(response.data);
			})
			.catch((error) => {
				toast.error("Error fetching data:", error);
			});
		isLoading(false);
	}, []);
	if (loading) return <Loader />;
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
								maxWidth: "1200px",
								textAlign: "center",
							}}>
							<h1
								style={{
									fontSize: "2.5rem",
									fontWeight: "bold",
									marginBottom: "1rem",
								}}>
								Evently - Contact Form Logs
							</h1>
							<p className="text-4xl">Admin View</p>

							<div className="overflow-hidden">
								<div
									className="relative overflow-x-auto mt-5 table-scroll"
									style={{ maxHeight: "650px" }}>
									<table className="border-spacing-2 w-full text-sm text-left rtl:text-right text-gray-500">
										<thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
											<tr>
												<th scope="col" className="px-6 py-3 rounded-s-lg">
													Email
												</th>
												<th scope="col" className="px-6 py-3">
													Name
												</th>
												<th scope="col" className="px-6 py-3 rounded-e-lg">
													Message
												</th>
											</tr>
										</thead>

										<tbody>
											{contactData.length == 0 ? (
												<tr
													aria-colspan={3}
													aria-rowspan={3}
													className="text-center justify-center m-2">
													No Data Found
												</tr>
											) : (
												contactData.map((contact) => (
													<tr key={contact._id} className="bg-white">
														<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
															{contact.email}
														</td>
														<td className="px-6 py-4">{contact.name}</td>
														<td className="px-6 py-4">{contact.message}</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default ContactLogs;
