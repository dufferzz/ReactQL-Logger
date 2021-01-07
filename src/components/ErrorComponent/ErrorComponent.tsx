import React from "react";
import { ApolloError } from "@apollo/client";

interface ErrorProp {
	error: ApolloError;
}

const ErrorComponent = ({ error }: ErrorProp) => {
	return (
		<>
			<div style={{ width: "100%", fontSize: "2rem", textAlign: "center" }}>
				🥺 Error!
				<br />
				Unauthorized!
			</div>
		</>
	);
};

export default ErrorComponent;
