import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery, useSubscription } from "@apollo/client";
import { Link } from "react-router-dom";
import FlexDiv from "../../components/_StyledComponents/FlexDiv";
import Section from "../../components/_StyledComponents/Section";
import SectionHeader from "../../components/_StyledComponents/SectionHeader";
import Button from "../../components/_StyledComponents/Button";
import Loading from "../../components/_SharedComponents/_Loading/Loading";
import ErrorComponent from "../../components/_SharedComponents/_ErrorComponent/ErrorComponent";
import ErrorBoundary from "../../components/_SharedComponents/_ErrorBoundary/ErrorBoundary";
import dayjs from "dayjs";

import GET_ALL_JOBS_QUERY from "../../querys/jobs/GetAllJobsQuery";
import GET_ASSIGNED_JOBS_QUERY from "../../querys/jobs/GetAssignedJobsQuery";

import JOB_ADDED_SUBSCRIPTION from "../../querys/jobs/JobAddedSubscription";
import ANY_JOB_UPDATED_SUBSCRIPTION from "../../querys/jobs/AnyJobUpdatedSubscription";
import ANY_JOB_DELETED_SUBSCRIPTION from "../../querys/jobs/AnyJobDeletedSubscription";

import JobsTable from "../../components/JobsTable/JobsTable";

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
		<Section style={{ padding: "1rem 0 0.7rem 0" }}>
			<SectionHeader>{user.nickname}'s Jobs</SectionHeader>
			<FlexDiv style={{ margin: 0, padding: 0 }}>
				{!loading && <span>Last Update: {time}</span>}
			</FlexDiv>
			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && (
				<JobsTable
					data={data.getAssignedJobs}
					subQuery={JOB_ADDED_SUBSCRIPTION}
					subscribeToMore={subscribeToMore}
					result={result}
				/>
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
		<Section style={{ padding: "1rem 0 0.7rem 0" }}>
			<SectionHeader>All Jobs</SectionHeader>
			<FlexDiv style={{ margin: 0, padding: 0 }}>
				{!loading && <span>Last Update: {time}</span>}
			</FlexDiv>

			{loading && <Loading />}
			{error && <ErrorComponent error={error} />}
			{!loading && data && subscribeToMore && (
				<ErrorBoundary>
					<JobsTable
						data={data.jobs}
						subQuery={JOB_ADDED_SUBSCRIPTION}
						subscribeToMore={subscribeToMore}
						result={result}
					/>
				</ErrorBoundary>
			)}
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
