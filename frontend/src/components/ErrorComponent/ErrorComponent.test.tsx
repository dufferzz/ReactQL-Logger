import { render, screen } from "@testing-library/react";
import ErrorComponent from "./ErrorComponent";
import { GraphQLError } from "graphql";

describe("Error Component Tests", () => {
	test("Error.message is shown properly", () => {
		const fuk = new GraphQLError("fuk");
		const ErrorMessage = {
			message: "You gone did fuked up",
			graphQLErrors: [fuk],
			networkError: null,
			extraInfo: "",
			name: "",
		};
		render(<ErrorComponent error={ErrorMessage} />);
		const errorText = screen.getByText(/You gone did fuked up/i);
		expect(errorText).toBeInTheDocument();
	});
});
