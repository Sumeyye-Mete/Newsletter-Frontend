const Input = ({ disabled = false, className = "", ...props }) => {
	return (
		<input
			disabled={disabled}
			className={`${className} dark:bg-neutral-800 outline-none border border-indigo-400 h-10 px-2 rounded-lg`}
			{...props}
		/>
	);
};

export default Input;
