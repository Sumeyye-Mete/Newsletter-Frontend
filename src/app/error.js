"use client";

import Button from "@/components/Button";

export default function ErrorMessage({ error, reset }) {
	console.log(error);
	return (
		<main className="grow flex flex-col items-center justify-start p-24 gap-10">
			<h1 className="mt-2 text-red-600 text-xl font-bold">Error!</h1>
			<p className="mt-2 text-red-600 text-sm"> {error.message}</p>
			<Button type="button" onClick={reset}>
				Try Again
			</Button>
		</main>
	);
}
