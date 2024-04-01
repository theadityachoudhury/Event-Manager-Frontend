import React, { startTransition, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../UserContext";
import axios from "axios";
import Loader from "../../components/Loader";
import { MoveLeft } from "lucide-react";
import InternalServerError from "../../components/InternalServerError";
import ReactDatePicker from "react-datepicker";
import Utils from "../../../Utils";
import { eventsSchema } from "../../../schema";
import toast from "react-hot-toast";

const EditEvent = ({ title }) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({});
	const [category, setCategory] = useState([]);
	const [iserror, setError] = useState(false);
	const { user, authenticated, ready } = useUserContext();
	const [request, setRequest] = useState(false);
	const [dates, setDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});
	const [eventImage, setEventImage] = useState();
	const defaultErrorState = {
		eventName: "",
		eventOwner: "",
		eventLocation: "",
		eventStartDate: "",
		eventEndDate: "",
		free: "",
		eventImageUploaded: "",
		price: "",
		eventURL: "",
		eventDescription: "",
		eventCategory: "",
		eventType: "",
		eventParticipationLimit: "",
		eventAttendanceRequired: "",
	};
	const [formError, setFormError] = useState(defaultErrorState);

	useEffect(() => {
		setLoading(true);
		let config = {
			method: "get",
			maxBodyLength: Infinity,
			url: `/api/event/${id}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.request(config)
			.then(({ data }) => {
				const {
					_id,
					__v,
					createdAt,
					updatedAt,
					participantsCount,
					...eventDetails
				} = data;
				setFormData({
					...eventDetails,
					eventCategory: data.eventCategory._id,
					eventImageUploaded: false,
				});
			})
			.catch((err) => {
				setError(true);
			});

		config = {
			method: "get",
			maxBodyLength: Infinity,
			url: "/api/category",
			headers: {
				"Content-Type": "application/json",
			},
		};

		axios
			.request(config)
			.then(({ data }) => {
				setCategory(data);
			})
			.catch((err) => {
				console.log(err);
			});

		setLoading(false);
	}, []);

	const handleImageSelector = async (e) => {
		const selectedFile = e.target.files[0]; // Use e.target.files to get the selected file
		const reader = new FileReader();

		reader.onload = () => {
			setEventImage(reader.result); // Set the image data URL to the state
		};

		if (selectedFile) {
			reader.readAsDataURL(selectedFile); // Read the file as data URL
			setFormData({ ...formData, eventImageUploaded: true }); // Update formData to indicate that an image is uploaded
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		setRequest(true);
		startTransition(async () => {
			try {
				eventsSchema.validateSync(formData, { abortEarly: false });
				let config = {
					method: "patch",
					maxBodyLength: Infinity,
					url: `/api/event/${id}`,
					headers: {
						"Content-Type": "application/json",
					},
					data: formData,
				};
				const { data } = await axios.request(config);
				const {
					_id,
					__v,
					createdAt,
					updatedAt,
					participantsCount,
					...eventDetails
				} = data;
				setFormData({
					...eventDetails,
					eventImageUploaded: false,
				});
				setRequest(false);
				toast.success("Event Updation Successful", {
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
				console.log(error);
				setRequest(false);
				const fieldErrors = {};
				if (error.inner) {
					error.inner.forEach((err) => {
						fieldErrors[err.path] = err.message;
					});
					setFormError({ ...formError, ...fieldErrors });
				}

				if (axios.isAxiosError(error)) {
					if (error?.message === "Network Error") {
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
					} else {
						toast.error(error.response.data.message, {
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

	if (user.data.role != "admin") {
		if (formData.ownerId) {
			if (formData.ownerId != user.data._id) {
				return <Navigate to={`/event/${id}`} />;
			}
		}
	}

	if (iserror) {
		return <InternalServerError />;
	}
	return (
		<div className="wrapper space-y-3">
			<div className="">
				<Link to={`/event/${id}`}>
					<p className="flex gap-2">
						<MoveLeft />
						Back to Event Page
					</p>
				</Link>
			</div>
			<h1 className="text-5xl">Edit Event</h1>

			<form className="p-5" onSubmit={handleSubmit}>
				{/* Event Name */}
				<div className="space-y-2 sm:bg-inherit hover:sm:bg-inherit p-5 rounded-lg">
					<div>
						<label
							htmlFor="eventName"
							className="block text-2xl font-medium leading-6 text-gray-900">
							Event Name
						</label>
					</div>
					<div>
						<input
							type="text"
							placeholder="Enter Event Name"
							id="eventName"
							name="eventName"
							value={formData.eventName}
							autoComplete="off"
							onChange={(e) => {
								setFormError({
									...formError,
									eventName: "",
								});
								setFormData({
									...formData,
									eventName: Utils.convertToTitleCase(e.target.value),
								});
							}}
							className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6"
						/>

						{formError.eventName == "" ? (
							<p className="text-sm mt-2 flex gap-2">
								This name will be showed as Event Title in the events page
							</p>
						) : (
							<p className="text-sm mt-2 flex gap-2 text-red-700">
								{formError.eventName}
							</p>
						)}
					</div>
				</div>

				{/* Event Owner */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2 0 p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventOwner"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Owner
							</label>
						</div>
						<div>
							<input
								type="text"
								placeholder="Enter Event Name"
								id="eventOwner"
								name="eventOwner"
								value={formData.eventOwner}
								disabled={true}
								onChange={(e) => {
									setFormError({
										...formError,
										eventOwner: "",
									});
									setFormData({
										...formData,
										eventOwner: Utils.convertToTitleCase(e.target.value),
									});
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300"
							/>
							{formError.eventOwner == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventOwner}
								</p>
							)}
						</div>
					</div>

					{/* Event Location */}
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventLocation"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Location
							</label>
						</div>
						<div>
							<input
								type="text"
								placeholder="Enter Event Name"
								id="eventLocation"
								name="eventLocation"
								value={formData.eventLocation}
								onChange={(e) => {
									setFormError({
										...formError,
										eventLocation: "",
									});
									setFormData({
										...formData,
										eventLocation: Utils.convertToTitleCase(e.target.value),
									});
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6"
							/>

							{formError.eventLocation == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventLocation}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Event Category */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2 0 p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventCategory"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Category
							</label>
						</div>
						<div>
							<select
								type="text"
								placeholder="Enter Event Name"
								id="eventCategory"
								name="eventOwner"
								value={formData.eventCategory}
								onChange={(e) => {
									setFormError({
										...formError,
										eventCategory: "",
									});
									console.log(e.target.value);
									setFormData({
										...formData,
										eventCategory: e.target.value,
									});
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300">
								{category.map((cat) => {
									return (
										<option
											className="bg-white hover:bg-gray-100 rounded-md"
											key={cat._id}
											value={cat._id}>
											{cat.categoryName}
										</option>
									);
								})}
							</select>
							{/* <a onClick={handleAddNewCategory}>Add a new category</a> */}
							{formError.eventCategory == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventCategory}
								</p>
							)}
						</div>
					</div>

					{/* Event Type */}
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventType"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Type
							</label>
						</div>
						<div>
							<select
								type="text"
								placeholder="Enter Event Type"
								id="eventType"
								name="eventType"
								value={formData.eventType}
								onChange={(e) => {
									setFormError({
										...formError,
										eventType: "",
									});
									if (e.target.value == "closed") {
										setFormData({
											...formData,
											eventType: e.target.value,
											price: 0,
											free: true,
										});
									} else {
										setFormData({
											...formData,
											eventType: e.target.value,
											price: 0,
											free: false,
										});
									}
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300">
								<option
									className="bg-white hover:bg-gray-100 rounded-md"
									key="open"
									value="open">
									Open
								</option>
								<option
									className="bg-white hover:bg-gray-100 rounded-md"
									key="closed"
									value="closed">
									Closed
								</option>
							</select>
							{formError.eventType == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventType}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Event Description */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventDescription"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Description
							</label>
						</div>
						<div>
							<textarea
								type="text"
								placeholder="Enter Event Description"
								id="eventDescription"
								name="eventDescription"
								value={formData.eventDescription}
								rows={10}
								onChange={(e) => {
									setFormError({
										...formError,
										eventDescription: "",
									});
									setFormData({
										...formData,
										eventDescription: e.target.value,
									});
								}}
								className="block w-full rounded-lg border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300"
							/>
							{formError.eventDescription == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventDescription}
								</p>
							)}
						</div>
					</div>

					{/* Event Image */}
					<div className="space-y-2  p-5">
						<div>
							<label
								htmlFor="dropzone-file"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Image
							</label>
						</div>
						{/* <div class="border border-dashed border-gray-500 relative">
							<input
								type="file"
								multiple
								className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
							/>
							<div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
								<h4>
									Drop files anywhere to upload
									<br />
									or
								</h4>
								<p class="">Select Files</p>
							</div>
						</div> */}

						<div class="flex items-center justify-center w-full">
							{formData.eventImageUploaded ? (
								// <div className="flex items-center justify-center w-full">
								// 	<img
								// 		src={eventImage}
								// 		alt="Selected Image"
								// 		className="max-w-w-auto"
								// 	/>
								// </div>

								<div className="flex items-center justify-center w-full">
									<div className="relative">
										<img
											src={eventImage}
											alt="Selected Image"
											className="max-w-xs border border-black rounded-md"
										/>
										<button
											onClick={() => {
												setEventImage(null); // Clear the selected image
												setFormData({ ...formData, eventImageUploaded: false }); // Update formData to indicate that no image is uploaded
											}}
											className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
											{/* <svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg> */}
											Delete
										</button>
									</div>
								</div>
							) : (
								<label
									for="dropzone-file"
									class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
									<div class="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold">Click to upload</span>
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF
										</p>
									</div>
									<input
										onChange={handleImageSelector}
										id="dropzone-file"
										type="file"
										class="hidden"
										accept=".png,.jpeg,.jpg,.gif"
									/>
								</label>
							)}
						</div>
					</div>
				</div>

				{/* Event URL */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventImage"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event URL
							</label>
						</div>
						<div>
							<input
								type="text"
								placeholder="Enter Event URL"
								id="eventURL"
								name="eventURL"
								value={formData.eventURL}
								rows={10}
								onChange={(e) => {
									setFormError({
										...formError,
										eventURL: "",
									});
									setFormData({
										...formData,
										eventURL: e.target.value,
									});
								}}
								className="block w-full rounded-lg border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300"
							/>
							{formError.eventURL == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventURL}
								</p>
							)}
						</div>
					</div>

					{/* Event Price */}
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="price"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Price
							</label>
						</div>
						<div className="">
							<div className="flex gap-1">
								<input
									type="number"
									placeholder="Enter Event Price"
									id="price"
									name="price"
									value={formData.price}
									rows={10}
									min={0}
									disabled={formData.free}
									onChange={(e) => {
										setFormError({
											...formError,
											price: "",
										});
										setFormData({
											...formData,
											price: e.target.value,
										});
									}}
									className="block w-full rounded-lg border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300"
								/>
								<label htmlFor="free" className="text-2xl mt-2">
									Free?
								</label>
								<input
									name="free"
									id="free"
									disabled={formData.eventType == "closed"}
									checked={formData.eventType == "closed" || formData.free}
									value={formData.free}
									onChange={(e) => {
										setFormError({
											...formError,
											free: "",
										});
										setFormData({
											...formData,
											free: !formData.free,
											price: 0,
										});
									}}
									type="checkbox"
									className="border-0 px-5 py-3 form-checkbox h-10 w-10 mt-1 text-indigo-600 border-gray-300 rounded-md focus:ring-indigo-500 cursor-pointer"
								/>
							</div>

							{formError.price == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.price}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Event Start Date */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2 p-5 rounded-lg sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventStartDate"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Start Date
							</label>
						</div>
						<div>
							<div className="block w-full rounded-lg border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300">
								<ReactDatePicker
									selected={dates.startDate}
									onChange={(date) => {
										setFormError({
											...formError,
											eventStartDate: "",
										});
										setDates({ ...dates, startDate: date });
										setFormData({
											...formData,
											eventStartDate: Utils.formatDateToISO(date),
										});
									}}
									showTimeSelect
									timeInputLabel="Time:"
									dateFormat="MM/dd/yyyy h:mm aa"
									wrapperClassName="datePicker"
								/>
							</div>

							{formError.eventStartDate == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventStartDate}
								</p>
							)}
						</div>
					</div>

					{/* Event End Date */}
					<div className="space-y-2 p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventEndDate"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event End Date
							</label>
						</div>
						<div>
							<div className="block w-full rounded-lg border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300">
								<ReactDatePicker
									selected={dates.endDate}
									onChange={(date) => {
										setFormError({
											...formError,
											eventEndDate: "",
										});
										if (dates.startDate > date) {
											setFormError({
												...formError,
												eventEndDate: "End date cannot be before start date",
											});
										} else {
											setFormError({
												...formError,
												eventEndDate: "",
											});
											setDates({ ...dates, endDate: date });
											setFormData({
												...formData,
												eventEndDate: Utils.formatDateToISO(date),
											});
										}
									}}
									showTimeSelect
									timeInputLabel="Time:"
									dateFormat="MM/dd/yyyy h:mm aa"
									wrapperClassName="datePicker"
								/>
							</div>

							{formError.eventEndDate == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventEndDate}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Event Participation Limit */}
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-10">
					<div className="space-y-2 0 p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventParticipationLimit"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Participation Limit
							</label>
						</div>
						<div>
							<input
								type="number"
								placeholder="Enter Event participation limit"
								id="eventParticipationLimit"
								name="eventParticipationLimit"
								value={formData.eventParticipationLimit}
								min={100}
								onChange={(e) => {
									setFormError({
										...formError,
										eventParticipationLimit: "",
									});
									setFormData({
										...formData,
										eventParticipationLimit: e.target.value,
									});
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300"
							/>
							{formError.eventParticipationLimit == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventParticipationLimit}
								</p>
							)}
						</div>
					</div>

					{/* Event Location */}
					<div className="space-y-2  p-5 rounded-lg  sm:bg-inherit hover:sm:bg-inherit">
						<div>
							<label
								htmlFor="eventAttendanceRequired"
								className="block text-2xl font-medium leading-6 text-gray-900">
								Event Attendance Required
							</label>
						</div>
						<div>
							<select
								type="text"
								placeholder="Enter Event Type"
								id="eventAttendanceRequired"
								name="eventAttendanceRequired"
								value={formData.eventAttendanceRequired}
								onChange={(e) => {
									setFormError({
										...formError,
										eventAttendanceRequired: "",
									});
									setFormData({
										...formData,
										eventAttendanceRequired: e.target.value,
									});
								}}
								className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6 disabled:bg-slate-300">
								<option
									className="bg-white hover:bg-gray-100 rounded-md"
									key={true}
									value={true}>
									Yes
								</option>
								<option
									className="bg-white hover:bg-gray-100 rounded-md"
									key={false}
									value={false}>
									No
								</option>
							</select>
							{formError.eventAttendanceRequired == "" ? (
								<p className="text-sm mt-2 flex gap-2">
									This name will be showed as Event Title in the events page
								</p>
							) : (
								<p className="text-sm mt-2 flex gap-2 text-red-700">
									{formError.eventAttendanceRequired}
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="space-y-2 p-5 rounded-lg sm:bg-inherit hover:sm:bg-inherit text-center">
					<button
						type="submit"
						className="bg-black text-white p-3 rounded-lg hover:bg-slate-800">
						Update Event
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditEvent;
