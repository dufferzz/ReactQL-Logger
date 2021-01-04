import React from "react";

const ErrorComponent = ({ error }: any) => {
	return (
		<h2>
			🥺 {String(error.message)}
			<pre>
				{error.graphQLErrors.map(({ message }: any, i: number) => (
					<span key={i}>{message}</span>
				))}
			</pre>
		</h2>
	);
};

export default ErrorComponent;
