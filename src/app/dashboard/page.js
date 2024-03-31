"use client";
import Loading from "@/components/Loading";
import { useArticles } from "@/hooks/articles";
import { createImageUrl, getArticles } from "@/lib/functions";
import { swalAlert, swalConfirm } from "@/lib/swal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { SpinnerCircular } from "spinners-react";

export default function Dashboard() {
	const { articles, deleteArticle, isLoading } = useArticles();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const router = useRouter();

	const handleDelete = async (event, id) => {
		event.stopPropagation();
		setLoading(true);
		try {
			const confirm = await swalConfirm("Are you sure to delete?", "question");
			if (!confirm) return;
			const resp = await deleteArticle({ setErrors, id });
			if (resp) {
				swalAlert("Article Deleted Successfuly", "success");
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error);
			swalAlert(
				error?.response?.data?.message || "Something went wrong",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) return <Loading />;

	return (
		<main className="grow flex flex-col items-center justify-between p-5  md:p-24">
			<div className="text-3xl w-full font-bold flex justify-between items-center pb-10">
				<h1>Edit News</h1>
				<Link
					className="bg-indigo-700 hover:bg-indigo-800  text-white p-5 rounded-full"
					href="/dashboard/article/new"
				>
					<img src="/add-post.svg" />
				</Link>
			</div>

			<div className="grid grid-cols-1 gap-5">
				{articles?.map((item) => {
					return (
						<div key={item.id} className="relative overflow-hidden">
							<Link
								href={`dashboard/article/edit/${item.id}`}
								className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow lg:flex-row lg:gap-20 lg:p-10 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
							>
								<img
									className="object-cover w-full aspect-square lg:w-96 rounded-t-lg lg:h-96   lg:rounded-none lg:rounded-s-lg"
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
							<button
								onClick={(e) => handleDelete(e, item.id)}
								className="absolute top-0 right-0  p-5 rounded-full text-3xl text-red-600 hover:text-red-800"
							>
								{loading ? (
									<SpinnerCircular
										size={20}
										thickness={100}
										speed={100}
										color="#ffffff"
										secondaryColor="rgba(0, 0, 0, 0.44)"
									/>
								) : (
									<MdDeleteOutline />
								)}
							</button>
						</div>
					);
				})}
			</div>
		</main>
	);
}
