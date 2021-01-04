import { render, screen } from "@testing-library/react";
import ErrorComponent from "./ErrorComponent";

describe("Error Component Tests", () => {
	test("Error.message is shown properly", () => {
		const ErrorMessage = {
			message: "You gone did fuked up",
			graphQLErrors: ["fuk"],
		};
		render(<ErrorComponent error={ErrorMessage} />);
		const errorText = screen.getByText(/You gone did fuked up/i);
		expect(errorText).toBeInTheDocument();
		const fukText = screen.getByText(/fuk/i);
		expect(fukText).toBeInTheDocument();
	});
});
