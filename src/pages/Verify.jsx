import React, { FormEvent, useEffect, useState } from "react";
import { AlertCircle, MoveLeft } from "lucide-react";
import { VerifySchema } from "../schema";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "../UserContext";
import Loader from "./components/Loader";
import OTPInput from "./components/OTPInput";
import axios from "axios";
import delay from "./components/delay";
import Footer from "../Footer";

const Verify = ({ title }) => {
	const [params] = useSearchParams();
	const callback = params.get("callback");
	const { user, authenticated, ready, verify } = useUserContext();

	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	const [show, setShow] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [formError, setFormError] = useState({
		email: "",
		account: "",
	});
	const [request, setRequest] = useState(false);

	const [formData, setFormData] = useState({
		email: user?.data?.email || "",
		otp: "",
	});

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			otp: e,
		});
		console.log(formData);
	};

	const resendOTP = async (e) => {
		e.preventDefault();
		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "/api/auth/generate",
			headers: {},
		};
		try {
			const response = await axios.request(config);
			toast.success("Code Sent Successfully!!", {
				style: {
					border: "1px solid",
					padding: "16px",
					color: "#1ccb5b",
				},
				iconTheme: {
					primary: "#1ccb5b",
					secondary: "#FFFAEE",
				},
			});
		} catch (error) {
			toast.error("Unable to contact servers! Please try again later", {
				style: {
					border: "1px solid",
					padding: "16px",
					color: "#fa776c",
				},
				iconTheme: {
					primary: "#fa776c",
					secondary: "#FFFAEE",
				},
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRequest(true);
		try {
			VerifySchema.validateSync(formData, { abortEarly: false });
			let config = {
				method: "post",
				maxBodyLength: Infinity,
				url: "/api/auth/verify",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					otp: formData.otp,
				},
			};

			const response = await axios.request(config);
			toast.success("Account Verified Successfully", {
				style: {
					border: "1px solid",
					padding: "16px",
					color: "#1ccb5b",
				},
				iconTheme: {
					primary: "#1ccb5b",
					secondary: "#FFFAEE",
				},
			});
			setFormData({ otp: "" });
			setRequest(false);
			verify();
			await delay(3000);
			setRedirect(true);
		} catch (error) {
			const fieldErrors = {};
			setRequest(false);

			if (error.inner) {
				error.inner.forEach((err) => {
					fieldErrors[err.path] = err.message;
				});
				setFormError(fieldErrors);
			}
			if (axios.isAxiosError(error)) {
				if (error?.response?.status == 401)
					setFormError({
						...formError,
						account: "Your OTP is wrong!! Please try again",
					});
				else if (error?.response?.status == 403)
					setFormError({
						...formError,
						account: "First generate OTP!! Then verify your account!!",
					});
				else if (error?.message === "Network Error") {
					console.log("Unable to contact servers! Please try again later");
					toast.error("Unable to contact servers! Please try again later", {
						style: {
							border: "1px solid",
							padding: "16px",
							color: "#fa776c",
						},
						iconTheme: {
							primary: "#fa776c",
							secondary: "#FFFAEE",
						},
					});
				}
			}
		}
	};
	if (!ready) {
		return <Loader title="Loading" />;
	}
	if (!authenticated) {
		if (callback) {
			return <Navigate to={callback} />;
		}
		return <Navigate to={"/login"} />;
	}
	if (authenticated && ready && user && user.data.verified) {
		if (callback) {
			return <Navigate to={callback} />;
		}
		console.log("here");
		return <Navigate to="/dashboard" />;
	}
	if (redirect) {
		if (callback) {
			return <Navigate to={callback} />;
		}
		return <Navigate to="/dashboard" />;
	}

	if (authenticated && ready && user && user.data)
		return (
			<>
				<div className="">
					<Toaster position="bottom-right" reverseOrder={true} />
				</div>
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:px-4">
					<div className="hidden md:block mb-1 sm:mx-auto sm:w-full sm:max-w-sm">
						<Link to="/">
							<p className="flex gap-2">
								<MoveLeft />
								Back to Home
							</p>
						</Link>
					</div>

					<div className="md:rounded-md md:border md:border-gray-300 md:shadow-md md:p-6 mx-auto">
						<div className="sm:mx-auto sm:w-full sm:max-w-sm">
							<Link to="/">
								<img
									className="mx-auto h-10 w-auto"
									src="/assets/images/logo.svg"
									alt="Evently"
									width={128}
									height={40}
								/>
							</Link>
							<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Activate your Account
							</h2>
						</div>

						<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
							{formError?.account && (
								<div className="mb-3">
									<div
										className="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-red-900 shadow-md"
										role="alert">
										<div className="flex">
											<div className="py-1">
												<svg
													className="mr-4 h-6 w-6 fill-current text-red-500"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
												</svg>
											</div>
											<div>
												<p className="font-bold">Account Error</p>
												<p className="text-sm">{formError?.account}</p>
											</div>
										</div>
									</div>
								</div>
							)}
							{!formError.account && (
								<div className="mb-3">
									<div
										className="rounded-b border-t-4 border-teal-500 bg-teal-100 px-4 py-2 text-teal-900 shadow-md"
										role="alert">
										<div className="flex">
											<div className="py-1">
												<svg
													className="mr-4 h-6 w-6 fill-current text-teal-500"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20">
													<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
												</svg>
											</div>
											<div>
												<p className="font-bold">
													Our systems are still in beta!
												</p>
												<p className="text-sm">
													Please contact{" "}
													<Link to="mailto:support@adityachoudhury.com">
														support@adityachoudhury.com
													</Link>{" "}
													if you face any issues!!
												</p>
											</div>
										</div>
									</div>
								</div>
							)}

							<form className="space-y-6" onSubmit={handleSubmit}>
								<div>
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
											placeholder={user.data.email}
											value={formData.email}
											disabled
											onChange={(e) => {
												setFormData({ ...formData, email: e.target.value });
												setFormError({ ...formError, email: "" });
											}}
											className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
										/>
									</div>
									{formError.email && (
										<p className="text-red-600 mx-auto">{formError.email}</p>
									)}
								</div>

								<div className="mx-auto">
									<label
										htmlFor="otp"
										className="block text-sm font-medium leading-6 text-gray-900">
										OTP
									</label>
									<OTPInput
										autoFocus
										length={6}
										className="otpContainer"
										inputClassName="otpInput mr-2"
										onChangeOTP={(otp) => handleInputChange(otp)}
									/>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										{request ? (
											<Loader spinner={true} text="Verifying OTP" />
										) : (
											"Verify OTP"
										)}
									</button>
								</div>
							</form>

							<p className="mt-10 text-center text-sm text-gray-500">
								Resend OTP?{" "}
								<button
									onClick={resendOTP}
									className="font-semibold leading-6 text-red-400 hover:text-indigo-600">
									Resend
								</button>
							</p>
						</div>
						<div className="md:hidden flex  m-3 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
							<Link to="/">
								<p className="flex gap-2">
									<MoveLeft />
									Back to Home
								</p>
							</Link>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
};

export default Verify;
