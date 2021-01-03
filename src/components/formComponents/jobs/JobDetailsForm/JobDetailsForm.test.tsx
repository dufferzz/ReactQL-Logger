import { render, screen } from "@testing-library/react";
import JobDetailsForm from "./JobDetailsForm";

const FakeData = {
	firstname: "sam",
	lastname: "sam",
	email: "sam",
	city: "sam",
	district: "sam",
	postcode: "sam",
	date: "sam",
	todo: "sam",
	done: "sam",
	status: "sam",
	assigned: "sam",
	make: "sam",
	model: "sam",
	year: "sam",
	serial: "sam",
	labourHours: "sam",
};

describe("JobDetailsForm Component Tests", () => {
	test("Am I present?", () => {
		render(<JobDetailsForm data={FakeData} />);
		const footerText = screen.getByText(/Job Details/i);
		expect(footerText).toBeInTheDocument();
	});
});
