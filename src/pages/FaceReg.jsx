import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../UserContext";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MoveLeft } from "lucide-react";
import * as faceapi from "face-api.js";

const FaceReg = ({ title }) => {
	const [isCameraStarted, setIsCameraStarted] = useState(false);
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);

	useEffect(() => {
		return () => {
			if (streamRef.current) {
				const tracks = streamRef.current.getTracks();
				tracks.forEach((track) => track.stop());
			}
		};
	}, []);
	const [params] = useSearchParams();
	const callback = params.get("callback");
	const [redirect, setRedirect] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	const [formError, setFormError] = useState({
		email: "",
		account: "",
		face: "",
	});
	const [cameraState, setCameraState] = useState("initial");

	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [capturedImage, setCapturedImage] = useState(null);
	const streamRef = useRef(null);

	const startCamera = async () => {
		videoRef.current.style.display = "block";

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
				await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
				await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

				const video = videoRef.current;
				const canvas = canvasRef.current;
				const displaySize = { width: video.width, height: video.height };
				faceapi.matchDimensions(canvas, displaySize);
				canvas.getContext("2d").imageSmoothingQuality = "high";
				setInterval(async () => {
					const detections = await faceapi
						.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
						.withFaceLandmarks()
						.withFaceDescriptors();
					console.log("Number of faces detected:", detections.length);

					if (detections.length > 1) {
						console.log("More than 1 face detected!");
					}
				}, 1000); // You can adjust the interval based on your preference

				streamRef.current = stream;
				setCameraState("started");
				setIsCameraStarted(true);
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const captureImage = () => {
		if (videoRef.current) {
			const video = videoRef.current;
			const canvas = canvasRef.current;
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas
				.getContext("2d")
				.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
			const image = canvas.toDataURL("image/png");
			setCapturedImage(image);
			stopCamera();
			setCameraState("captured");
		}
	};

	const stopCamera = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			const stream = videoRef.current.srcObject;
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop());

			// Set the video element to null or hide it
			videoRef.current.srcObject = null;
			setCameraState("initial");
		}
		setIsCameraStarted(false);
	};

	const recaptureImage = () => {
		// Clear the previously captured image
		setCapturedImage(null);

		// Update camera state to "started"
		startCamera();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
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
	if (authenticated && ready && user && user.data.verified && user.data.face) {
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
	if (
		authenticated &&
		ready &&
		user &&
		user.data &&
		user.data.verified &&
		!user.data.face
	) {
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
								Register your Face
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
											placeholder="Enter your E-Mail"
											value={user.data.email}
											disabled
											readOnly
											className="block w-full rounded-md border-0 py-2.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
										/>
									</div>
									{formError.email && (
										<p className="text-red-600 mx-auto">{formError.email}</p>
									)}
								</div>

								<div className="">
									<label
										htmlFor="face"
										className="block text-sm font-medium leading-6 text-gray-900">
										Face
									</label>
									<div className="md:rounded-md md:border md:border-gray-300 md:shadow-md mx-auto">
										<div>
											<div>
												<video ref={videoRef} autoPlay playsInline />
												{/* <div className="mt-2 flex flex-wrap justify-center gap-2">
													<button
														className="mr-2 justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focu s-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
														onClick={startCamera}>
														Start Camera
													</button>
													<button
														className="mr-2 justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focu s-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
														onClick={captureImage}>
														Capture Image
													</button>
													<button
														className="mr-2 justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focu s-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
														onClick={stopCamera}>
														Stop Camera
													</button>
												</div> */}

												{capturedImage && (
													<img src={capturedImage} alt="Captured" />
												)}
												<canvas ref={canvasRef} style={{ display: "none" }} />

												<div className="flex flex-wrap justify-center gap-2 m-2">
													{cameraState === "initial" && (
														<button
															className="rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
															onClick={startCamera}>
															Start Camera
														</button>
													)}

													{cameraState === "started" && (
														<>
															<button
																className="rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
																onClick={captureImage}>
																Capture Image
															</button>
															<button
																className="rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
																onClick={stopCamera}>
																Stop Camera
															</button>
														</>
													)}

													{cameraState === "captured" && (
														<>
															<button
																className="rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
																onClick={recaptureImage}>
																Recapture
															</button>
															{/* Add logic to handle the captured image */}
														</>
													)}
												</div>
											</div>
										</div>
									</div>
									{formError.face && (
										<p className="text-red-600 mx-auto">{formError.email}</p>
									)}
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focu s-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Register Face
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
			</>
		);
	}
};

export default FaceReg;
