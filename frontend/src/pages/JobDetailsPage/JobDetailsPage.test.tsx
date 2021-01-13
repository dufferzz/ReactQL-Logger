import { render, screen } from "@testing-library/react";
import JobDetailsPage from "./JobDetailsPage";

describe("Job Details Page Tests - Not Logged In", () => {
	test("Renders Loading Text", () => {
		render(<JobDetailsPage />);
		const loadingText = screen.getByText(/Loading/i);
		expect(loadingText).toBeInTheDocument();
	});
});
