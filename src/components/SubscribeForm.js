import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useArticles } from "@/hooks/articles";
import InputError from "./InputError";
import axios from "@/lib/axios";
import { SpinnerCircular } from "spinners-react";
import { swalAlert } from "@/lib/swal";

const SubscribeForm = () => {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const { csrf } = useArticles();

	const submitForm = async (e) => {
		e.preventDefault();
		await csrf();
		setLoading(true);
		const payload = {
			email,
		};
		try {
			const resp = await axios.post("api/v1/subscribe", payload);
			swalAlert("You have subscribed successfully", "success");
			setEmail("");
		} catch (error) {
			if (error.response.status !== 422) throw error;
			setErrors(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-1/2 flex flex-col gap-5">
			<h3>Subscribe to our newsletter </h3>
			<InputError messages={errors.email} />
			<form onSubmit={submitForm} className="flex items-stretch gap-5">
				<Input
					type="email"
					id="email"
					placeholder="example@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					autoFocus
					autoComplete="off"
				/>
				<Button disabled={loading} className="rounded-lg flex gap-2">
					{loading && (
						<SpinnerCircular
							size={20}
							thickness={100}
							speed={100}
							color="#ffffff"
							secondaryColor="rgba(0, 0, 0, 0.44)"
						/>
					)}
					Subscribe
				</Button>
			</form>
		</div>
	);
};

export default SubscribeForm;
