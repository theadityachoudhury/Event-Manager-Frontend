"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { AlertCircle, Eye, EyeOff, MoveLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VerifyFormData } from "@/types";
import { Verifyschema } from "@/Schemas";
import { ZodError } from "zod";
import OTPInput from "@/components/shared/OTPInput";

const Page = () => {
	const [show, setShow] = useState(false);
	const [formError, setFormError] = useState<any>({
		email: "",
		password: "",
		account: "",
	});
	const [formData, setFormData] = useState<VerifyFormData>({
		email: "",
		otp: "",
	});
	const handleInputChange = (e: string) => {
		setFormData({
			...formData,
			otp: e,
		});
		console.log(formData);
	};
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			Verifyschema.parse(formData);
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
							Verify your account
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
										disabled
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
									inputClassName="otpInput text-xl ml-2"
									onChangeOTP={(otp) => handleInputChange(otp)}
								/>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Verify
								</button>
							</div>
						</form>

						<p className="mt-10 text-center text-sm text-gray-500">
							Having Trouble? Contact our support team{" "}
							<Link
								href="/contact"
								className="font-semibold leading-6 text-red-400 hover:text-indigo-600">
								Here
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
