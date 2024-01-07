import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import { headerLinks } from "../../Constants";

const NavItems = () => {
	const { authenticated } = useUserContext();
	const [showMenu, setShowMenu] = useState(false);
	const location = useLocation();

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className="w-full">
			<div className="md:flex-between hidden md:flex">
				<ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
					{headerLinks.map((link) => {
						const isActive = location.pathname === link.route;

						if (link.public === true || authenticated)
							return (
								<li
									key={link.route}
									className={`${
										isActive && "text-indigo-600"
									} flex-center p-medium-16 whitespace-nowrap`}>
									<Link to={link.route}>{link.label}</Link>
								</li>
							);
					})}
				</ul>
			</div>

			{/* Responsive Navigation for Small Screens */}
			<div className="md:hidden sm:block">
				<div
					onClick={toggleMenu}
					className="flex items-center cursor-pointer text-3xl p-4">
					☰
				</div>
				{showMenu && (
					<div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 bg-white rounded-lg">
							<div className="flex justify-end">
								<button
									onClick={toggleMenu}
									className="text-gray-600 hover:text-gray-800 focus:outline-none text-2xl">
									&#10006;
								</button>
							</div>
							<ul className="flex flex-col items-start gap-6">
								{headerLinks.map((link) => {
									const isActive = location.pathname === link.route;

									if (link.public === true || authenticated)
										return (
											<li
												key={link.route}
												className={`${
													isActive && "text-indigo-600"
												} flex-center p-medium-16 whitespace-nowrap`}>
												<Link to={link.route} onClick={toggleMenu}>
													{link.label}
												</Link>
											</li>
										);
								})}
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavItems;
