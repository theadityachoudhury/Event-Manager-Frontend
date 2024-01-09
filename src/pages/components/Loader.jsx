import { useEffect } from "react";

export default function Loader({ title, spinner, text }) {
	useEffect(() => {
		// Update the document title when the component mounts
		document.title = title + " | Evently";

		// Optionally, you can return a cleanup function to revert the title when the component unmounts
		return () => {
			document.title = "Evently"; // Set your default title here
		};
	}, [title]);
	if (spinner == true) {
		return (
			<>
				{text}
				<div className="spinner text-white ml-2">
					<svg
						width="20"
						height="21"
						viewBox="0 0 13 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
							stroke="white"
						/>
					</svg>
				</div>
			</>
		);
	}
	return (
		<div className="h-screen flex justify-center items-center">
			<svg
				className="w-10 h-10 animate-spin"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512">
				<path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
			</svg>
		</div>
	);
}
