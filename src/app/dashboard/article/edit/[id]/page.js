import ArticleForm from "@/components/ArticleForm";
import React from "react";

const EditArticle = ({ params }) => {
	return (
		<>
			<ArticleForm edit={true} id={params.id} />
		</>
	);
};

export default EditArticle;
