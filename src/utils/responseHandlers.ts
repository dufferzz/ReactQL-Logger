const sendError = (error) => {
	return {
		success: false,
		data: null,
		error: error,
	};
};

const sendResponse = (data) => {
	return {
		success: true,
		data: data,
		error: "",
	};
};

export { sendError, sendResponse };
