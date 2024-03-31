export const createImageUrl = (path) => {
	return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${path}`;
};
