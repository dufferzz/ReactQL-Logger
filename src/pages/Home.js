import React from "react";
import JobsList from "../components/JobsList";
import { useAuth0 } from "@auth0/auth0-react";

const JobList = () => {
	return (
		<table style={{ width: "100%", textAlign: "center" }}>
			<thead>
				<tr>
					<td>Status</td>
					<td>ID</td>
					<td>Client</td>
					<td>Created</td>
				</tr>
			</thead>
			<tbody>
				<JobsList />
			</tbody>
		</table>
	);
};

const HomePage = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ fontSize: "1.3rem" }}>
				You are like, totally not logged in!
			</div>
			<div style={{ fontSize: "1.1rem" }}>
				There is a login button on the Nav!
			</div>
		</div>
	);
};

const Home = () => {
	const { isAuthenticated } = useAuth0();

	return <div>{isAuthenticated ? <JobList /> : <HomePage />}</div>;
};

export default Home;
