"use client";
import Loading from "@/components/Loading";
import NewsCard from "@/components/NewsCard";
import SubscribeForm from "@/components/SubscribeForm";
import { useArticles } from "@/hooks/articles";
import { getArticles } from "@/lib/functions";
import { useEffect, useState } from "react";

export default function Home() {
	const { articles, isLoading, isCashed } = useArticles();
	console.log(isCashed);
	if (isLoading) return <Loading />;

	return (
		<main className="grow flex flex-col items-center justify-between p-5  lg:p-24">
			<div className="grid grid-cols-1">
				<SubscribeForm />
				{articles?.map((item) => (
					<NewsCard key={item.id} item={item} isCashed={isCashed} />
				))}
			</div>
		</main>
	);
}
