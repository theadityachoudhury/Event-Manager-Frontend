import React, { startTransition, useEffect, useState } from "react";
import { useUserContext } from "../UserContext";
import Loader from "./components/Loader";
import { ContactSchema } from "../schema";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ContactLogs from "./components/ContactLogs/ContactLogs";
import Footer from "../Footer";

const Contact = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);

	const { user, ready, authenticated } = useUserContext();
	const [request, setRequest] = useState(false);
	const [formData, setFormData] = useState({
		email: user?.data?.email || "",
		name: user?.data?.name || "",
		message: "",
	});

	const [formError, setFormError] = useState({
		email: "",
		name: "",
		message: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRequest(true);
		startTransition(async () => {
			try {
				ContactSchema.validateSync(formData, { abortEarly: false });
				const config = {
					method: "post",
					maxBodyLength: Infinity,
					url: "/api/pr/contact",
					headers: {
						"Content-Type": "application/json",
					},
					data: formData,
				};
				console.log(config);
				await axios.request(config);
				toast.success("Successfully Submitted the Ticket!!");
				setRequest(false);
				setFormData({
					email: user?.data?.email || "",
					name: user?.data?.name || "",
					message: "",
				});
			} catch (error) {
				setRequest(false);
				const fieldErrors = {};
				if (error.inner) {
					error.inner.forEach((err) => {
						fieldErrors[err.path] = err.message;
					});
					setFormError(fieldErrors);
				} else {
					toast.error("Something went wrong!!");
				}
			}
		});
	};
	if (!ready) {
		return <Loader title="Loading" />;
	}

	if (authenticated && ready && user && user.data.role === "admin") {
		const isSmallScreen = window.innerWidth <= 768;
		return (
			<>
				{isSmallScreen ? (
					<div className="flex h-screen text-4xl text-center">
						<p className="my-auto">
							Webpage not supported in small screen devices
						</p>
					</div>
				) : (
					<ContactLogs />
				)}
			</>
		);
	} else {
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
									Evently - Contact Form
								</h1>

								<form className="space-y-6" onSubmit={handleSubmit}>
									<div className="m-2 text-left">
										<div className="mt-5">
											<label
												htmlFor="email"
												className="block text-sm font-medium leading-6 text-gray-900">
												Email address
											</label>
											<div className="mt-2">
												<input
													id="email"
													name="email"
													type="text"
													autoComplete="off"
													disabled={user?.data?.email}
													placeholder="Enter your E-Mail"
													value={formData.email}
													onChange={(e) => {
														setFormData({ ...formData, email: e.target.value });
														setFormError({ ...formError, email: "" });
													}}
													className="block w-full rounded-full border-0 px-5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-300"
												/>
											</div>
											{formError.email && (
												<p className="mx-auto text-red-600">
													{formError.email}
												</p>
											)}
										</div>

										<div className="mt-5">
											<label
												htmlFor="name"
												className="block text-sm font-medium leading-6 text-gray-900">
												Name
											</label>
											<div className="mt-2">
												<input
													id="name"
													name="name"
													type="text"
													autoComplete="off"
													disabled={user?.data?.email}
													placeholder="Enter your Name"
													value={formData.name}
													onChange={(e) => {
														setFormData({ ...formData, name: e.target.value });
														setFormError({ ...formError, name: "" });
													}}
													className="block w-full rounded-full border-0 px-5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-300"
												/>
											</div>
											{formError.name && (
												<p className="mx-auto text-red-600">{formError.name}</p>
											)}
										</div>

										<div className="mt-5">
											<label
												htmlFor="message"
												className="block text-sm font-medium leading-6 text-gray-900">
												Message
											</label>
											<div className="mt-2">
												<textarea
													id="message"
													name="message"
													rows={10}
													type="text"
													autoComplete="off"
													placeholder="Enter your Message"
													value={formData.message}
													onChange={(e) => {
														setFormData({
															...formData,
															message: e.target.value,
														});
														setFormError({ ...formError, message: "" });
													}}
													className="block w-full rounded-3xl border-0 px-5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
												/>
											</div>

											{formError.message && (
												<p className="mx-auto text-red-600">
													{formError.message}
												</p>
											)}
										</div>
										<div className="mt-4 justify-center text-center">
											<button
												disabled={request}
												type="submit"
												className=" w-full justify-center rounded-full bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-800">
												{request ? "Submitting the form" : "Submit"}
											</button>
										</div>
									</div>
								</form>
							</div>
						</section>
					</main>
				</div>
				<Footer />
			</>
		);
	}
};

export default Contact;
