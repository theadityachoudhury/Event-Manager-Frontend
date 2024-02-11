import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const InstallAppButton = () => {
	const [showInstallPrompt, setShowInstallPrompt] = useState(true);

	useEffect(() => {
		// Check if the install prompt has been dismissed before
		const dismissedBefore = Cookies.get("installPromptDismissed");
		if (dismissedBefore) {
			setShowInstallPrompt(false);
		} else {
			// If the cookie flag doesn't exist, set it to indicate that the install prompt hasn't been dismissed
			Cookies.set("installPromptDismissed", "false");
		}

		const handleBeforeInstallPrompt = (event) => {
			// Prevent the browser's default install prompt if it hasn't been dismissed before
			if (!dismissedBefore) {
				event.preventDefault();
			}
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = () => {
		// Set a cookie flag to indicate that the install prompt has been dismissed
		Cookies.set("installPromptDismissed", "true");
		// Hide the install prompt
		setShowInstallPrompt(false);
	};

	return (
		showInstallPrompt && (
			<button onClick={handleInstallClick}>Install App Hello</button>
		)
	);
};

export default InstallAppButton;
