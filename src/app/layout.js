import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "News",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	);
}