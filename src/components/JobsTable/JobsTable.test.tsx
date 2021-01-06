import { render, screen } from "@testing-library/react";
import JobsList from "./JobsTable";
import { MockedProvider } from "@apollo/client/testing";

const mocks: any[] = []; // We'll fill this in next
describe("JobsTable Component Tests", () => {
	test("Loading displays", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<JobsList />
			</MockedProvider>
		);
		const statusText = screen.getByText(/Client/i);
		expect(statusText).toBeInTheDocument();
	});
});
