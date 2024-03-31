import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useArticles = () => {
	const router = useRouter();
	const params = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [isCashed, setIsCashed] = useState(true);

	const {
		data: articles,
		error,
		mutate,
	} = useSWR("/api/v1/articles", () =>
		axios
			.get("/api/v1/articles")
			.then((res) => {
				setIsCashed(res?.data?.isCashed);
				return res?.data?.articles?.data;
			})
			.catch((error) => {
				if (error.response.status !== 409) throw error;
			})
	);

	const csrf = () => axios.get("/sanctum/csrf-cookie");

	const getArticleById = async ({ setErrors, id }) => {
		await csrf();
		setErrors([]);
		try {
			const resp = await axios.get(`/api/v1/articles/${id}`);
			mutate();
			return resp.data;
		} catch (error) {
			if (error.response.status !== 409) throw error;
			setErrors(error.response.data.message);
		}
	};

	const createArticle = async ({ setErrors, formData }) => {
		await csrf();
		setErrors([]);

		try {
			const resp = await axios.post(`/api/v1/articles/`, formData, {
				"Content-Type": "multipart/form-data",
			});
			mutate();
			return resp;
		} catch (error) {
			if (error.response.status !== 422) throw error;
			setErrors(error.response.data.message);
		}
	};
	const editArticle = async ({ setErrors, id, formData }) => {
		await csrf();
		setErrors([]);

		try {
			const resp = await axios.post(`/api/v1/articles/${id}`, formData, {
				"Content-Type": "multipart/form-data",
			});
			mutate();
			return resp;
		} catch (error) {
			if (error.response.status !== 422) throw error;
			setErrors(error.response.data.message);
		}
	};

	const deleteArticle = async ({ setErrors, id }) => {
		await csrf();
		setErrors([]);

		try {
			const resp = axios.delete(`/api/v1/articles/${id}`);
			mutate();
			return resp;
		} catch (error) {
			if (error.response.status !== 422) throw error;
			setErrors(error.response.data.message);
		}
	};

	useEffect(() => {
		if (articles || error) {
			setIsLoading(false);
		}
	}, [articles, error]);

	return {
		articles,
		isLoading,
		isCashed,
		getArticleById,
		createArticle,
		editArticle,
		deleteArticle,
		csrf,
	};
};
