import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";
import { MemoryRouter } from "react-router-dom";

describe("SideBar Component Tests", () => {
	test("Am I present?", () => {
		render(
			<MemoryRouter initialEntries={["/"]}>
				<SideBar />
			</MemoryRouter>
		);
		const sideBarText = screen.getByText(/Parts Management/i);
		expect(sideBarText).toBeInTheDocument();
	});
});
