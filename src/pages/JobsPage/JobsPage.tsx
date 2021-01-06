import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import CenterDiv from "../../components/StyledComponents/CenteredDiv";
import FlexDiv from "../../components/StyledComponents/FlexDiv";
import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import PageHeading from "../../components/StyledComponents/PageHeading";
import Button from "../../components/StyledComponents/Button";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import JobsTable from "../../components/JobsTable/JobsTable";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import JOBS_SUBSCRIPTION from "../../querys/jobs/JobsSubscription";

const JobsPage = () => {
	const { user } = useAuth0();
	const { data, error, loading, subscribeToMore, ...result } = useQuery(
		GET_ALL_JOBS_QUERY,
		{
			fetchPolicy: "cache-and-network",
		}
	);

	return (
		<>
			<CenterDiv>
				<PageHeading>{user.email}</PageHeading>
			</CenterDiv>
			<FlexDiv>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
				<Link to="/search">
					<Button>Search</Button>
				</Link>
			</FlexDiv>
			<Section>
				{/* <Sub /> */}
				<SectionHeader>All Jobs</SectionHeader>

				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{data && (
					<JobsTable
						jobs={data}
						{...result}
						subscribeToNewJobs={() =>
							subscribeToMore({
								document: JOBS_SUBSCRIPTION,
								updateQuery: (currentData, { subscriptionData }) => {
									if (!subscriptionData.data) {
										return currentData;
									}
									const newJobItem = subscriptionData.data.jobAdded;
									return Object.assign({}, currentData, {
										jobs: [newJobItem, ...currentData.jobs],
									});
								},
							})
						}
					/>
				)}
			</Section>
		</>
	);
};

export default withAuthenticationRequired(JobsPage, {
	onRedirecting: () => <Loading />,
});
