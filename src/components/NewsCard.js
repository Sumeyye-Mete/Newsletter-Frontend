import { createImageUrl } from "@/lib/functions";
import Link from "next/link";
import React from "react";

const NewsCard = ({ item, isCashed }) => {
	return (
		<div
			className={`mt-8 ${
				isCashed ? "dark:bg-teal-700" : "bg-white dark:bg-gray-800"
			}  overflow-hidden shadow rounded-lg`}
		>
			<div className="p-2 border-t border-gray-200 dark:border-gray-700 md:border-t-0 md:border-l">
				<Link
					href={`article/${item.id}`}
					className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:gap-20 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden"
				>
					<img
						className="object-cover w-full md:w-96 rounded-t-lg md:h-96  md:rounded-none md:rounded-s-lg"
						src={
							item?.attributes?.image === "https://picsum.photos/800/600"
								? item?.attributes?.image
								: createImageUrl(item?.attributes?.image)
						}
						alt={item?.attributes?.title}
					/>

					<div className="flex flex-col gap-5 justify-between p-4 leading-normal">
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-800 dark:text-white">
							{item?.attributes?.title}
						</h5>
						<p className="truncated-text">{item?.attributes?.body}</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default NewsCard;
