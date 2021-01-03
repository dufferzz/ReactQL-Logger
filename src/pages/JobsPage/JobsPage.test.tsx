import { render, screen } from "@testing-library/react";
import JobsPage from "./JobsPage";

describe("Job List Page Tests - Not Logged In", () => {
	test("Renders Loading Text", () => {
		render(<JobsPage />);
		const loadingText = screen.getByText(/Loading/i);
		expect(loadingText).toBeInTheDocument();
	});
});
