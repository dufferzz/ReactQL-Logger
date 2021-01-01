import Section from "../components/styledComponents/Section";
import SectionHeader from "../components/styledComponents/SectionHeader";
import { useAuth0 } from "@auth0/auth0-react";

import { useSubscription, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "../components/styledComponents/Button";
import JobsList from "../components/JobsList";

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
	});
	console.log(data);
	return <h4>{!loading && <div>New Job: {JSON.stringify(data)} </div>}</h4>;
};

const JobList = () => {
	const { user } = useAuth0();

	return (
		<>
			<div style={{ width: "100%", textAlign: "center", margin: "1rem" }}>
				<h2>{user.email}</h2>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
				<Link to="/search">
					<Button>Search</Button>
				</Link>
			</div>

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
		</>
	);
};

const Jobs = () => <JobList />;

export default Jobs;
