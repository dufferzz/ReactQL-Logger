import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import FlexDiv from "../../components/_StyledComponents/FlexDiv";

import CenterDiv from "../../components/_StyledComponents/CenteredDiv";

import Section from "../../components/_StyledComponents/Section";
import Button from "../../components/_StyledComponents/Button";
import Loading from "../../components/_SharedComponents/Loading/Loading";
import ErrorComponent from "../../components/_SharedComponents/ErrorComponent/ErrorComponent";
import ErrorBoundary from "../../components/_SharedComponents/ErrorBoundary/ErrorBoundary";
import dayjs from "dayjs";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import GET_ASSIGNED_JOBS_QUERY from "../../querys/jobs/GetAssignedJobsQuery";

import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import ANY_JOB_UPDATED_SUBSCRIPTION from "../../querys/jobs/AnyJobUpdatedSubscription";
import ANY_JOB_DELETED_SUBSCRIPTION from "../../querys/jobs/AnyJobDeletedSubscription";

import JobsTable from "../../components/Jobs/JobsTable/JobsTable";

const AssignedJobs = ({ user }: any) => {
	const { data, error, loading, subscribeToMore, ...result } = useQuery(
		GET_ASSIGNED_JOBS_QUERY,
		{
			variables: { user: user.nickname },
			fetchPolicy: "cache-and-network",
		}
	);

	const time: string = dayjs(Date.now()).format("HH:mm:ss");

	return (
		<Section title={`${user.nickname}'s Jobs`} style={{ padding: "0" }}>
			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && data.getAssignedJobs.success && (
				<ErrorBoundary>
					<JobsTable
						data={data.getAssignedJobs.data}
						subQuery={JOB_ADDED_SUBSCRIPTION}
						subscribeToMore={subscribeToMore}
						result={result}
					/>
					<CenterDiv style={{ margin: "0.5rem", paddingTop: "0.25rem" }}>
						Last Update: {time}
					</CenterDiv>
				</ErrorBoundary>
			)}
			{data && !data.getAssignedJobs.success && (
				<ErrorComponent error={data.getAssignedJobs.error} />
			)}
		</Section>
	);
};

const AllJobs = () => {
	const time: string = dayjs(Date.now()).format("HH:mm:ss");

	const { data, error, loading, subscribeToMore, ...result } = useQuery(
		GET_ALL_JOBS_QUERY,
		{
			fetchPolicy: "cache-and-network",
		}
	);
	console.log(data);
	return (
		<Section title="All Jobs" style={{ padding: "0" }}>
			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && data.jobs.success && (
				<ErrorBoundary>
					<JobsTable
						data={data.jobs.data}
						subQuery={JOB_ADDED_SUBSCRIPTION}
						subscribeToMore={subscribeToMore}
						result={result}
					/>
					<CenterDiv style={{ margin: "0.5rem", paddingTop: "0.25rem" }}>
						Last Update: {time}
					</CenterDiv>
				</ErrorBoundary>
			)}
			{data && !data.jobs.success && <ErrorComponent error={data.jobs.error} />}
		</Section>
	);
};

const JobsPage = () => {
	const { user } = useAuth0();

	useSubscription(ANY_JOB_DELETED_SUBSCRIPTION);
	useSubscription(ANY_JOB_UPDATED_SUBSCRIPTION);

	return (
		<>
			<FlexDiv>
				<Link to="/newjob">
					<Button>Create Job</Button>
				</Link>
			</FlexDiv>

			<AssignedJobs user={user} />
			<AllJobs />
		</>
	);
};

export default withAuthenticationRequired(JobsPage, {
	onRedirecting: () => <Loading />,
});
