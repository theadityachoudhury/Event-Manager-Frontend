import { Link } from "react-router-dom";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
			<footer className="border-t">
				<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
					<Link to="/">
						<img
							src="/assets/images/logo.svg"
							alt="logo"
							width={128}
							height={38}
						/>
					</Link>

					<p>© {year} Evently. All Rights reserved.</p>
				</div>
			</footer>
	);
};

export default Footer;
