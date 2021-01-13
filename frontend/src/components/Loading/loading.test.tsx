import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component Tests", () => {
	test("Does it show loading?", () => {
		render(<Loading />);
		const loadingText = screen.getByText(/Loading.../i);
		expect(loadingText).toBeInTheDocument();
	});
});
