"use client";

import { swalAlert } from "@/lib/swal";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Label from "./Label";
import Input from "./Input";
import InputError from "./InputError";
import Button from "./Button";
import { useArticles } from "@/hooks/articles";
import { useRouter } from "next/navigation";
import { createImageUrl } from "@/lib/functions";
import { SpinnerCircular } from "spinners-react";

const ArticleForm = ({ edit = false, id = "" }) => {
	const { createArticle, getArticleById, editArticle } = useArticles();
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [image, setImage] = useState(null);
	const [fileUrl, setFileUrl] = useState("");
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);

	const onDrop = useCallback((acceptedFiles) => {
		setImage(acceptedFiles[0]);
		setFileUrl(URL.createObjectURL(acceptedFiles[0]));
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpeg", ".jpg", ".svg"],
		},
	});

	const submitForm = async (event) => {
		event.preventDefault();
		setLoading(true);
		let props;
		if (edit && !image) {
			props = { title, body };
		} else {
			props = { title, body, image };
		}

		const formData = new FormData();
		Object.keys(props).forEach((key) => {
			formData.append(key, props[key]);
		});
		if (edit) {
			try {
				const resp = await editArticle({ setErrors, id, formData });
				if (resp) {
					swalAlert("Article Editted Successfuly", "success");
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
		} else {
			try {
				const resp = await createArticle({ setErrors, formData });
				if (resp) {
					swalAlert("New Article Created Successfuly", "success");
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
		}
	};

	const loadData = async (id) => {
		const resp = await getArticleById({ setErrors, id });
		const item = resp.articles;
		setTitle(item?.attributes?.title);
		setBody(item?.attributes?.body);
		setFileUrl(createImageUrl(item?.attributes?.image));
	};

	useEffect(() => {
		if (edit && id) {
			loadData(id);
		}
	}, [edit, id]);

	return (
		<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
			<div className="w-full sm:max-w-3xl mt-6 px-6 py-4  shadow-md overflow-hidden sm:rounded-lg">
				<form onSubmit={submitForm}>
					<div>
						<Label htmlFor="title">Title</Label>

						<Input
							id="title"
							type="text"
							value={title}
							className="block mt-1 w-full"
							onChange={(event) => setTitle(event.target.value)}
							required
							autoFocus
						/>

						<InputError messages={errors.title} className="mt-2" />
					</div>

					<div className="mt-4">
						<Label htmlFor="body">Body</Label>

						<textarea
							id="body"
							type="textarea"
							value={body}
							rows={10}
							cols={10}
							className="outline-none border border-indigo-400 dark:bg-neutral-800  block mt-1 w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-2"
							onChange={(event) => setBody(event.target.value)}
							required
						/>

						<InputError messages={errors.body} className="mt-2" />
					</div>

					{/* Confirm Password */}

					<div
						{...getRootProps()}
						className="flex flex-center p-10 flex-col bg-dark-3 rounded-xl cursor-pointer"
					>
						<input {...getInputProps()} className=" cursor-pointer" />
						{fileUrl ? (
							<div className="flex flex-1 flex-col justify-center w-full p-5 lg:p-10">
								<img
									src={fileUrl}
									alt="article"
									className="w-full aspect-square object-cover"
								/>
								<p className="file_uploader-label">
									Click or Drag a photo to replace
								</p>
							</div>
						) : (
							<div className="flex flex-col items-center">
								<img
									src="/file-upload.svg"
									width={96}
									height={"auto"}
									alt="file-upload"
									className=""
								/>
								<h3 className=" font-semibold text-light-2 mb-2 mt-6">
									Drag photo here
								</h3>{" "}
								<p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
								<Button className="shad-button_dark_4" type="button">
									Select from computer
								</Button>
							</div>
						)}
						<InputError messages={errors.image} className="mt-2" />
					</div>

					<div className="flex items-center justify-end mt-4">
						<Button className="ml-4 flex gap-2" disabled={loading}>
							{loading && (
								<SpinnerCircular
									size={20}
									thickness={100}
									speed={100}
									color="#ffffff"
									secondaryColor="rgba(0, 0, 0, 0.44)"
								/>
							)}{" "}
							Save
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ArticleForm;
