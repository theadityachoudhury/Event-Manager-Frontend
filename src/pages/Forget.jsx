import React, { FormEvent, useEffect, useState } from "react";
import { AlertCircle, MoveLeft } from "lucide-react";
import { ForgetSchema } from "../schema";
import { Toaster } from "react-hot-toast";

const Forget = ({ title }) => {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	const [show, setShow] = useState(false);
	const [formError, setFormError] = useState({
		email: "",
		account: "",
	});
	const [formData, setFormData] = useState({
		email: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			ForgetSchema.validateSync(formData, { abortEarly: false });
			console.log("Form data is valid:", formData);
		} catch (error) {
			const fieldErrors = {};
			if (error.inner) {
				error.inner.forEach((err) => {
					fieldErrors[err.path] = err.message;
				});
				setFormError(fieldErrors);
			}
		}
	};
	return (
        <>
            <div className="">
					<Toaster position="bottom-right" reverseOrder={true} />
				</div>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:px-4">
				<div className="hidden md:block mb-1 sm:mx-auto sm:w-full sm:max-w-sm">
					<a href="/">
						<p className="flex gap-2">
							<MoveLeft />
							Back to Home
						</p>
					</a>
				</div>

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
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Recover your Account
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
												<a href="mailto:support@adityachoudhury.com">
													support@adityachoudhury.com
												</a>{" "}
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
										placeholder="Enter your E-Mail"
										value={formData.email}
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

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Recover Account
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Wanna Login?{" "}
							<a
								href="/signup"
								className="font-semibold leading-6 text-red-400 hover:text-indigo-600">
								Login Here
							</a>
						</p>
					</div>
					<div className="md:hidden flex  m-3 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
						<a href="/">
							<p className="flex gap-2">
								<MoveLeft />
								Back to Home
							</p>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Forget;
