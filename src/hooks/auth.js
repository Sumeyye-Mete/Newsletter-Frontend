import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useAuth = ({ middleware } = {}) => {
	const router = useRouter();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(true);

	const {
		data: user,
		error,
		mutate,
	} = useSWR("/api/v1/user", () =>
		axios
			.get("/api/v1/user")
			.then((res) => res.data)
			.catch((error) => {
				if (error.response.status !== 409) throw error;
			})
	);

	const csrf = () => axios.get("/sanctum/csrf-cookie");

	const login = async ({ setErrors, ...props }) => {
		await csrf();

		setErrors([]);

		axios
			.post("/login", props)
			.then(() => mutate() && router.push("/dashboard"))
			.catch((error) => {
				if (error.response.status !== 422) throw error;

				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const logout = async () => {
		await csrf();
		await axios.post("/logout");
		mutate(null);

		router.push("/");
	};

	useEffect(() => {
		if (user || error) {
			setIsLoading(false);
		}
		if (middleware === "guest" && user) router.push("/dashboard");
		if (middleware === "auth" && error) router.push("/login");
	}, [user, error, middleware]);

	return {
		user,
		isLoading,
		login,
		logout,
		csrf,
	};
};
