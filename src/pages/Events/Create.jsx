import { BadgeInfo, Info } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useUserContext } from "../../UserContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Utils from "../../Utils";
import axios from "axios";
import Loader from "../components/Loader";
import { eventsSchema } from "../../schema";
import toast from "react-hot-toast";
const create = ({ title }) => {
	const { user } = useUserContext();
	const [category, setCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [request, setRequest] = useState(false);
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
	const [pending, startTransition] = useTransition();

	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);

	useEffect(() => {
		let config = {
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
				setFormData({ ...formData, eventCategory: data[0]._id });
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const defaultState = {
		eventName: "",
		eventOwner: user.data.name,
		ownerId: user.data._id,
		eventLocation: "",
		eventStartDate: Utils.formatDateToISO(new Date()),
		eventEndDate: Utils.formatDateToISO(new Date()),
		free: false,
		eventImageUploaded: false,
		price: 0,
		eventURL: "",
		eventDescription: "",
		eventCategory: "",
		eventType: "open",
		eventParticipationLimit: 100,
		eventAttendanceRequired: false,
	};
	const [formData, setFormData] = useState(defaultState);

	const [dates, setDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleAddNewCategory = () => {};

	if (loading) {
		<Loader title="Loading" />;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		setRequest(true);
		startTransition(async () => {
			try {
				eventsSchema.validateSync(formData, { abortEarly: false });
				let config = {
					method: "post",
					maxBodyLength: Infinity,
					url: "/api/event",
					headers: {
						"Content-Type": "application/json",
					},
					data: formData,
				};
				const { data } = await axios.request(config);
				setFormData(defaultState);
				setRequest(false);
				toast.success("Event Creation Successful", {
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
				setRequest(false);
				const fieldErrors = {};
				if (error.inner) {
					error.inner.forEach((err) => {
						fieldErrors[err.path] = err.message;
					});
					setFormError({ ...formError, ...fieldErrors });
				}

				if (axios.isAxiosError(error)) {
					if (error?.response?.status == 500)
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

	return (
		<>
			<div className="flex flex-col bg-white">
				<main className="flex-1">
					<div className="text-5xl bg-slate-200 bg-dotted-pattern bg-contain p-10 text-center">
						Create An Event
					</div>
					<section className="wrapper">
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
												This name will be showed as Event Title in the events
												page
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
													eventLocation: Utils.convertToTitleCase(
														e.target.value
													),
												});
											}}
											className="block w-full rounded-md border-0 px-5 py-3 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm md:text-md sm:leading-6"
										/>

										{formError.eventLocation == "" ? (
											<p className="text-sm mt-2 flex gap-2">
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
											htmlFor="eventImage"
											className="block text-2xl font-medium leading-6 text-gray-900">
											Event Image
										</label>
									</div>
									<div className="border h-auto overflow-">
										<input
											type="file"
											name="eventImage"
											id="eventImage"
											className="overflow-auto"
											accept=".jpg"
										/>
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
												This name will be showed as Event Title in the events
												page
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
												checked={
													formData.eventType == "closed" || formData.free
												}
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
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
													setDates({ ...dates, endDate: date });
													setFormData({
														...formData,
														eventEndDate: Utils.formatDateToISO(date),
													});
												}}
												showTimeSelect
												timeInputLabel="Time:"
												dateFormat="MM/dd/yyyy h:mm aa"
												wrapperClassName="datePicker"
											/>
										</div>

										{formError.eventEndDate == "" ? (
											<p className="text-sm mt-2 flex gap-2">
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
												This name will be showed as Event Title in the events
												page
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
									Submit
								</button>
							</div>
						</form>
					</section>
				</main>
			</div>
		</>
	);
};

export default create;
