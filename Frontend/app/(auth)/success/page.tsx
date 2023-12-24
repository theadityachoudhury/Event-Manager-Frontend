"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	const router = useRouter();
	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			router.push("/login");
		}, 10000);

		// Cleanup the timer to avoid memory leaks
		return () => clearTimeout(redirectTimer);
	}, [router]);
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
						<Image
							className="mx-auto h-60 w-auto"
							src="/assets/images/tick.gif"
							alt="Evently"
							width={400}
                            height={400}
                        />
						<h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Account Creation Successful
						</h2>
					</div>
					<p className="mt-1 text-center text-sm text-gray-500">
						You will be redirected to the login page in 10 seconds!
					</p>
				</div>
			</div>
		</>
	);
};

export default Page;
