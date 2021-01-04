import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useSubscription, useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "../../components/StyledComponents/Button";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

import JobsTable from "../../components/JobsTable/JobsTable";

const Sub = () => {
	const JOB_SUBSCRIPTION = gql`
		subscription jobAdded {
			jobAdded {
				_id
				firstname
				lastname
			}
		}
	`;
	const { data, loading } = useSubscription(JOB_SUBSCRIPTION);
	return <h4>{!loading && <div>New Job: {JSON.stringify(data)} </div>}</h4>;
};

const JobsPage = () => {
	const { loading, error, data } = useQuery(QUERY);
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
				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{data && <JobsTable jobs={data.jobs} />}
			</Section>
		</>
	);
};

const QUERY = gql`
	query GetJobs {
		jobs {
			_id
			firstname
			lastname
			created
			modified
			status
		}
	}
`;

export default withAuthenticationRequired(JobsPage, {
	onRedirecting: () => <Loading />,
});
