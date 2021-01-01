import React from "react";
import JobsList from "../components/JobsList";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useSubscription, gql } from "@apollo/client";
// import Loading from "../components/Loading";

const Section = styled.div`
	grid-area: content;
	border: 1px solid #aaa;
	padding: 1rem;
	border-radius: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	grid-gap: 0.25rem;
	margin: 0 0 1.5rem 0;
	line-break: anywhere;
	background-color: #eee;
`;
const SectionHeader = styled.div`
	grid-area: header;
	text-align: center;
	font-size: 1.1rem;
	width: 100%;
	margin-bottom: 0.5rem;
`;

const Sub = () => {
	const JOB_SUBSCRIPTION = gql`
		subscription jobAdded {
			jobAdded {
				firstname
				lastname
			}
		}
	`;
	const { data, loading } = useSubscription(JOB_SUBSCRIPTION, {
		variables: {},
		errorPolicy: "all",
	});
	console.log(data);
	return <h4>{!loading && <div>New Job: {JSON.stringify(data)} </div>}</h4>;
};

const JobList = () => {
	return (
		<Section>
			<Sub />
			<SectionHeader>All Jobs</SectionHeader>
			<table
				style={{
					width: "100%",
					textAlign: "center",
				}}
			>
				<thead>
					<tr style={{ fontSize: "1.1rem" }}>
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
		</Section>
	);
};

const HomePage = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div style={{ textAlign: "center" }}>
			<div style={{ fontSize: "1.3rem" }}>
				You are like, totally not logged in!
			</div>
			<div style={{ fontSize: "1.1rem" }}>Don't have an account?</div>
			<div>
				<button
					onClick={() =>
						loginWithRedirect({
							screen_hint: "signup",
						})
					}
				>
					Create an account
				</button>
			</div>
		</div>
	);
};

const Home = () => {
	const { isAuthenticated } = useAuth0();

	return <>{isAuthenticated ? <JobList /> : <HomePage />}</>;
};

export default Home;
