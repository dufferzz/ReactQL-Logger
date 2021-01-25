import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";
import { MemoryRouter } from "react-router-dom";

describe("SideBar Component Tests - Not Logged In", () => {
	test("Am I present?", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<SideBar />
			</MemoryRouter>
		);
		const sideBarText = screen.getByText(/Log In now/i);
		expect(sideBarText).toBeInTheDocument();
	});
});
