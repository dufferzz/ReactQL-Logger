import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

describe("SideBar Component Tests", () => {
	test("Am I present?", () => {
		render(<SideBar />);
		const sideBarText = screen.getByText(/I Sidebar/i);
		expect(sideBarText).toBeInTheDocument();
	});
});
