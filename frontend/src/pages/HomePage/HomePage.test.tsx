import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Home Page Tests - Not Logged In", () => {
	test("Renders Welcome Text", () => {
		render(<HomePage />);
		const welcomeText = screen.getByText(
			/Welcome to DFZ Service and Repair Administration!/i
		);
		expect(welcomeText).toBeInTheDocument();
	});
	test("Renders Login Button", () => {
		render(<HomePage />);
		const welcomeText = screen.getByText(/Log in now/i);
		expect(welcomeText).toBeInTheDocument();
	});
	test("Renders Create Account Button", () => {
		render(<HomePage />);
		const welcomeText = screen.getByText(/Create an account/i);
		expect(welcomeText).toBeInTheDocument();
	});
});
