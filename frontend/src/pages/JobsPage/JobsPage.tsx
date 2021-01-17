import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import FlexDiv from "../../components/StyledComponents/FlexDiv";
import Section from "../../components/StyledComponents/Section";
import SectionHeader from "../../components/StyledComponents/SectionHeader";
import Button from "../../components/StyledComponents/Button";
import Loading from "../../components/Loading/Loading";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import JobsTable from "../../components/JobsTable/JobsTable";
import dayjs from "dayjs";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import ANY_JOB_UPDATED_SUBSCRIPTION from "../../querys/jobs/AnyJobUpdatedSubscription";
import ANY_JOB_DELETED_SUBSCRIPTION from "../../querys/jobs/AnyJobDeletedSubscription";

const JobsPage = () => {
	const { data, error, loading, subscribeToMore, ...result } = useQuery(
		GET_ALL_JOBS_QUERY,
		{
			fetchPolicy: "cache-and-network",
		}
	);
	useSubscription(ANY_JOB_DELETED_SUBSCRIPTION);
	useSubscription(ANY_JOB_UPDATED_SUBSCRIPTION);
	const time: any = Date.now();

	return (
		<>
			<FlexDiv>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
			</FlexDiv>
			<Section style={{ padding: "1rem 0 0 0" }}>
				{/* <Sub /> */}
				<SectionHeader>All Jobs</SectionHeader>
				<FlexDiv style={{ margin: 0, padding: 0 }}>
					{!loading && (
						<span>Last Update: {dayjs(time).format("HH:mm:ss")}</span>
					)}
				</FlexDiv>

				{loading && <Loading />}
				{error && <ErrorComponent error={error} />}
				{!loading && data && subscribeToMore && (
					<ErrorBoundary>
						<JobsTable
							jobs={data}
							{...result}
							subscribeToNewJobs={() =>
								subscribeToMore({
									document: JOB_ADDED_SUBSCRIPTION,
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
					</ErrorBoundary>
				)}
			</Section>
		</>
	);
};

export default withAuthenticationRequired(JobsPage, {
	onRedirecting: () => <Loading />,
});
