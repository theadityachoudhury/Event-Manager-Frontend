"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { AlertCircle, MoveLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ResetFormData } from "@/types";
import { Resetschema } from "@/Schemas";
import { ZodError } from "zod";

const Page = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const [formError, setFormError] = useState<any>({
		password: "",
	});
	const [formData, setFormData] = useState<ResetFormData>({
		password: "",
		cpassword: "",
	});
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			Resetschema.parse(formData);
			console.log("Form data is valid:", formData);
		} catch (error: any) {
			console.log(error);
			if (error instanceof ZodError) {
				const fieldErrors: Record<string, string> = {};
				error.errors.forEach((err) => {
					if (err.path) {
						fieldErrors[err.path[0]] = err.message;
					}
				});
				setFormError(fieldErrors);
				console.log(formError);
			}
		}
	};
	return (
		<>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:px-4">
				<div className="hidden md:block mb-1 sm:mx-auto sm:w-full sm:max-w-sm">
					<Link href="/">
						<p className="flex gap-2">
							<MoveLeft />
							Back to Home
						</p>
					</Link>
				</div>

				<div className="md:rounded-md md:border md:border-gray-300 md:shadow-md md:p-6 mx-auto">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<Link href="/">
							<Image
								className="mx-auto h-10 w-auto"
								src="/assets/images/logo.svg"
								alt="Evently"
								width={128}
								height={40}
							/>
						</Link>
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Reset your Password
						</h2>
					</div>

					<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
						{formError?.account && (
							<div className="mb-3">
								<Alert variant="destructive" className="">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Account Error</AlertTitle>
									<AlertDescription>{formError?.account}</AlertDescription>
								</Alert>
							</div>
						)}
						{!formError.account && (
							<div className="mb-3">
								<Alert className="">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Info</AlertTitle>
									<AlertDescription>
										This system is in beta. For any bugs report to{" "}
										<Link href="mailto:support@adityachoudhury.com">
											support@adityachoudhury.com
										</Link>
									</AlertDescription>
								</Alert>
							</div>
						)}

						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900">
									New Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="text"
										autoComplete="off"
										placeholder="Enter new Password"
										value={formData.password}
										onChange={(e) => {
											setFormData({ ...formData, password: e.target.value });
											setFormError({ ...formError, password: "" });
										}}
										className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>
								{formError.password && (
									<p className="text-red-600 mx-auto">{formError.password}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="cpassword"
									className="block text-sm font-medium leading-6 text-gray-900">
									Confirm Password
								</label>
								<div className="mt-2">
									<input
										id="cpassword"
										name="cpassword"
										type="text"
										autoComplete="off"
										placeholder="Enter confirm Password"
										value={formData.cpassword}
										onChange={(e) => {
											setFormData({ ...formData, cpassword: e.target.value });
											setFormError({ ...formError, cpassword: "" });
										}}
										className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
									/>
								</div>
								{formError.cpassword ||
									(formData.password != formData.cpassword &&
										formData.password != "" &&
										formData.cpassword != "" && (
											<p className="text-red-600">
												{formError.cpassword || "Password do not match"}
											</p>
										))}
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
							<Link
								href="/signup"
								className="font-semibold leading-6 text-red-400 hover:text-indigo-600">
								Login Here
							</Link>
						</p>
					</div>
					<div className="md:hidden flex  m-3 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
						<Link href="/">
							<p className="flex gap-2">
								<MoveLeft />
								Back to Home
							</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
