"use client";

import Loading from "@/components/Loading";
import { useArticles } from "@/hooks/articles";
import { createImageUrl } from "@/lib/functions";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export default function PostDefault({ params }) {
	const { getArticleById } = useArticles();
	const [item, setItem] = useState();
	const [errors, setErrors] = useState();

	const loadData = async () => {
		const resp = await getArticleById({ setErrors, id: params.id });
		setItem(resp.articles);
	};
	useEffect(() => {
		loadData();
	}, []);

	if (!item) return <Loading />;

	return (
		<div className="grow max-w-6xl w-full mt-8 mx-auto sm:px-6 lg:px-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
			<div className="grid grid-cols-1 items-center">
				<div className="flex flex-col justify-between p-4 leading-normal">
					<h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{item?.attributes?.title}
					</h5>

					<p className="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
						{item?.relationships?.author?.name},{" "}
						{format(parseISO(item?.attributes?.created_at), "MMMM dd, yyyy")}
					</p>
				</div>

				<div className="p-6  dark:border-gray-700 ">
					<img
						className="object-cover w-full rounded-lg md:h-auto md:max-h-[500px]"
						src={
							item?.attributes?.image === "https://picsum.photos/800/600"
								? item?.attributes?.image
								: createImageUrl(item?.attributes?.image)
						}
						alt={item?.attributes?.title}
					/>
				</div>
				<div>
					<div className="flex flex-col justify-between p-4 leading-normal">
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							{item?.attributes?.body}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
