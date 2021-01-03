import { render, screen } from "@testing-library/react";
import NewJobPage from "./NewJobPage";

describe("Job Details Page Tests - Not Logged In", () => {
	test("Renders Loading Text", () => {
		render(<NewJobPage />);
		const loadingText = screen.getByText(/Loading/i);
		expect(loadingText).toBeInTheDocument();
	});
});
