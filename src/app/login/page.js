"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";

export default function Login() {
	const [email, setEmail] = useState("john@example.com");
	const [password, setPassword] = useState("password");
	const [errors, setErrors] = useState([]);

	const { login, isLoading, user } = useAuth({ middleware: "guest" });

	const submitForm = (e) => {
		e.preventDefault();
		login({ email, password, setErrors });
	};

	if (isLoading || user) {
		return <Loading />;
	}

	return (
		<main className="grow flex items-center justify-center p-5 md:p-24">
			<div className="w-full md:w-[500px] mx-auto border border-indigo-600 rounded-lg shadow p-10">
				{errors.length > 0 && (
					<>
						<h1 className="mt-2 text-red-600 text-xl font-bold">Error!</h1>
						<ul>
							{errors.map((error) => (
								<li className="mt-2 text-red-600 text-sm" key={error}>
									{error}
								</li>
							))}
						</ul>
					</>
				)}
				<form
					onSubmit={submitForm}
					autoComplete="off"
					className="w-full h-full flex flex-col gap-5"
				>
					<div></div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoFocus
							autoComplete="off"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoFocus
							autoComplete="off"
						/>
					</div>
					<div className="text-center">
						<Button disabled={isLoading}>
							{isLoading && (
								<SpinnerCircular
									size={20}
									thickness={100}
									speed={100}
									color="#ffffff"
									secondaryColor="rgba(0, 0, 0, 0.44)"
								/>
							)}{" "}
							Login
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
}
