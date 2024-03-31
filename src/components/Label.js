const Label = ({ children, className = "", ...props }) => {
	return (
		<label
			className={`${className} block text-indigo-700 font-bold`}
			{...props}
		>
			{children}
		</label>
	);
};

export default Label;
