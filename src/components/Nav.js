"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";

const Nav = () => {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<nav
			className={`flex sticky top-0 z-20 justify-between p-4 text-white ${
				user ? "bg-teal-500" : "bg-indigo-500"
			}`}
		>
			<Link className="hover:font-bold" href="/">
				{" "}
				Home
			</Link>
			{user ? (
				<div>
					<Link className="hover:font-bold mr-5" href="/dashboard">
						Dashboard
					</Link>
					<button onClick={handleLogout} className="hover:font-bold">
						{" "}
						Logout
					</button>
				</div>
			) : (
				<Link href="/login" className="hover:font-bold">
					{" "}
					Login
				</Link>
			)}
		</nav>
	);
};

export default Nav;
