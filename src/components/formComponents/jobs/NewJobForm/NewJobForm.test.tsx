import { render, screen } from "@testing-library/react";
import NewJobForm from "./NewJobForm";

describe("NewJobForm Component Tests", () => {
	test("Am I present?", () => {
		render(<NewJobForm />);
		const customerInformationText = screen.getByText(/Customer Information/i);
		expect(customerInformationText).toBeInTheDocument();
	});
});
