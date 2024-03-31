import { SpinnerCircular } from "spinners-react";

const Loading = () => {
	return (
		<main className="grow flex flex-col items-center justify-center p-24">
			<SpinnerCircular
				size={50}
				thickness={100}
				speed={100}
				color="#36ad47"
				secondaryColor="rgba(0, 0, 0, 0.44)"
			/>
		</main>
	);
};

export default Loading;
