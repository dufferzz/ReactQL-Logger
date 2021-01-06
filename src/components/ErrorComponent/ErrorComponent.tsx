import React from "react";
import { ApolloError } from "@apollo/client";

interface ErrorProp {
	error: ApolloError;
}

const ErrorComponent = ({ error }: ErrorProp) => {
	return (
		<>
			<span style={{ width: "100%", textAlign: "center" }}>
				<span style={{ fontSize: "2rem" }}>🥺 {String(error.message)}</span>
				{error.graphQLErrors.map(({ message }: any, i: number) => (
					<span key={i}>{message}</span>
				))}
			</span>
		</>
	);
};

export default ErrorComponent;
