import React from "react";

const InternalServerError = ({
	errMsg = "Internal Server Error",
	errDesc = "Please try again after some time!!",
}) => {
	return (
		<div className="wrapper text-center flex-center">
			<div className="bg-red-800 text-white p-5 bg-opacity-75">
				<p className="text-2xl font-semibold">{errMsg}</p>
				<p className="text-xl font-thin">{errDesc}</p>
			</div>
		</div>
	);
};

export default InternalServerError;
