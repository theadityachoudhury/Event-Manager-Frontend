import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Get Me Through",
	description: "GetMeThrough is a platform for event management.",
	icons: {
		icon: "/assets/images/logo.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppins.variable}>
				<div className="">
					<Toaster position="bottom-right" reverseOrder={true} />
				</div>
				{children}
			</body>
		</html>
	);
}
