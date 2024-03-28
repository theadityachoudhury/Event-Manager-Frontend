import React, { startTransition, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./components/Loader";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import { ResetSchema } from "../schema";
import toast from "react-hot-toast";
import Footer from "../Footer";

const ResetPassword = () => {
	let { otp } = useParams();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		password: "",
		cpassword: "",
	});
	const [formError, setFormError] = useState({
		password: "",
		cpassword: "",
		account: "",
	});
	const [validLink, setValidLink] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const [request, setRequest] = useState(false);

	useEffect(() => {
		if (otp) {
			isValid(otp);
		} else {
			setLoading(false);
		}
	}, []);

	async function isValid(sub) {
		try {
			const res = await axios.get("/api/auth/forget/" + sub);
			console.log(res);
			setValidLink(true);
			setLoading(false);
		} catch (err) {
			setValidLink(false);
			setLoading(false);
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError({ password: "", cpassword: "", account: "" });
		setRequest(true);
		startTransition(async () => {
			try {
				ResetSchema.validateSync(formData, { abortEarly: false });
				let config = {
					method: "post",
					maxBodyLength: Infinity,
					url: "/api/auth/forget/save",
					headers: {
						"Content-Type": "application/json",
					},
					data: {
						otp: otp,
						password: formData.password,
					},
				};
				const response = await axios.request(config);
				setFormData({ cpassword: "", password: "" });
				setRequest(false);
				toast.success("Password Reset Link Sent Successfully", {
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
				setResetSuccess(true);
			} catch (error) {
				setRequest(false);
				const fieldErrors = {};
				if (error.inner) {
					error.inner.forEach((err) => {
						fieldErrors[err.path] = err.message;
					});
					setFormError(fieldErrors);
				}

				if (axios.isAxiosError(error)) {
					if (error?.response?.status == 404) {
						setFormError({
							...formError,
							account:
								"Unable to find an account connected to this Email-Id!! Please Signup!!",
						});
					} else if (error?.response?.status == 500)
						setFormError({
							...formError,
							account: `Internal server error!${error.response.data.message}. Please try again later!`,
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
		});
	};

	if (loading) {
		return <Loader />;
	}

	if (validLink) {
		if (resetSuccess) {
			return (
				<>
					<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:px-4">
						<div className="md:rounded-md md:border md:border-gray-300 md:shadow-md md:p-6 mx-auto">
							<div className="sm:mx-auto sm:w-full sm:max-w-sm">
								<a href="/">
									<img
										className="mx-auto h-10 w-auto"
										src="/assets/images/logo.svg"
										alt="Evently"
										width={128}
										height={40}
									/>
								</a>
								<img
									className="mx-auto h-60 w-auto"
									src="/assets/images/tick.gif"
									alt="Evently"
									width={400}
									height={400}
								/>
								<h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
									Account Password Reset Successful
								</h2>
							</div>
							<p className="mt-1 text-center text-sm text-gray-500">
								Now you can login!!
							</p>
						</div>
					</div>
					<Footer />
				</>
			);
		} else {
			return (
				<>
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
									Reset Your Password
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

								<form className="space-y-6 mb-1" onSubmit={handleSubmit}>
									<div>
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900">
											Password
										</label>
										<div className="mt-2">
											<input
												id="password"
												name="password"
												type="password"
												autoComplete="off"
												placeholder="Enter new password"
												value={formData.password}
												onChange={(e) => {
													setFormData({
														...formData,
														password: e.target.value,
													});
													setFormError({ ...formError, password: "" });
												}}
												className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
											/>
										</div>
										{formError.password && (
											<p className="text-red-600 mx-auto">
												{formError.password}
											</p>
										)}
									</div>

									<div>
										<label
											htmlFor="cpassword"
											className="block text-sm font-medium leading-6 text-gray-900">
											Password
										</label>
										<div className="mt-2">
											<input
												id="cpassword"
												name="cpassword"
												type="password"
												autoComplete="off"
												placeholder="Confirm your password"
												value={formData.cpassword}
												onChange={(e) => {
													setFormData({
														...formData,
														cpassword: e.target.value,
													});
													setFormError({ ...formError, cpassword: "" });
												}}
												className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
											/>
										</div>
										{formData.cpassword != "" &&
											formData.cpassword != formData.password && (
												<p className="text-red-600 mx-auto">
													"Password do not match"
												</p>
											)}
									</div>

									<div>
										<button
											disabled={formData.password != formData.cpassword}
											type="submit"
											className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
											Reset Password
										</button>
									</div>
								</form>

								{/* <p className="mt-10 text-center text-sm text-gray-500">
									Wanna Login?{" "}
									<Link
										to="/login"
										className="font-semibold leading-6 text-red-400 hover:text-indigo-600">
										Login Here
									</Link>
								</p> */}
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
		}
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:px-4">
				<div className="md:rounded-md md:border md:border-gray-300 md:shadow-md md:p-6 mx-auto">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<a href="/">
							<img
								className="mx-auto h-10 w-auto"
								src="/assets/images/logo.svg"
								alt="Evently"
								width={128}
								height={40}
							/>
						</a>
						{/* <img
							className="mx-auto h-60 w-auto"
							src="/assets/images/tick.gif"
							alt="Evently"
							width={400}
							height={400}
						/> */}

						<div className="mx-auto h-60 w-auto pt-8 text-red-600 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="400"
								height="200"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-x-circle">
								<circle cx="12" cy="12" r="10" />
								<path d="m15 9-6 6" />
								<path d="m9 9 6 6" />
							</svg>
						</div>
						<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Invalid Password Reset Link
						</h2>
					</div>
					<p className="mt-1 text-center text-sm text-gray-500">
						Please check the link again or regenerate password reset link!!
					</p>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ResetPassword;
