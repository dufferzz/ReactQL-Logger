import { render, screen } from "@testing-library/react";
import TopNav from "./TopNav";
import { MemoryRouter } from "react-router-dom";

describe("TopNav Component Tests", () => {
	test("Login Button displays", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<TopNav />
			</MemoryRouter>
		);
		const loginButton = screen.getByText(/Login/i);
		expect(loginButton).toBeInTheDocument();
	});
});
