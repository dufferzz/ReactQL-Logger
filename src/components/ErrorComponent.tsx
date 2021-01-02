import React from "react";

const ErrorComponent = ({ error }: any) => {
	return <h2>🥺 {String(error.message)}</h2>;
};

export default ErrorComponent;
