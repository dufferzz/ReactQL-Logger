import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Loading Text on init", () => {
	render(<App />);
	const linkElement = screen.getByText(/Loading/i);
	expect(linkElement).toBeInTheDocument();
});
