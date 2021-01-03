import { render, screen } from "@testing-library/react";
import JobsList from "./JobsList";
import { MockedProvider } from "@apollo/client/testing";

const mocks: any[] = []; // We'll fill this in next
describe("JobsList Component Tests", () => {
	test("Loading displays", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<table>
					<tbody>
						<JobsList />
					</tbody>
				</table>
			</MockedProvider>
		);
		const loginButton = screen.getByText(/Loading/i);
		expect(loginButton).toBeInTheDocument();
	});
});
